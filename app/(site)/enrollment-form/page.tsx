"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { ink } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { FORMSPREE_ENROLLMENT_FORM_ACTION } from "@/lib/campConfig";

const sessionOptions = ["June 8-26, 2026", "July 6-24, 2026"];
const gradeOptions = ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
const tshirtOptions = ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL"];
const roboticsLevelOptions = [
  "None",
  "Beginner",
  "Some experience",
  "Competitive team experience",
  "Advanced competitive / leadership experience",
];
const roboticsProgramOptions = [
  "LEGO Robotics",
  "VEX",
  "FIRST Tech Challenge (FTC)",
  "FIRST Robotics Competition (FRC)",
  "School robotics elective",
  "Other",
];
const programmingOptions = ["None", "Scratch", "Python", "Java", "C++", "Arduino", "Other"];
const cadOptions = ["None", "Fusion 360", "Onshape", "Tinkercad", "SolidWorks", "Other"];
const laptopAccessOptions = ["Yes", "No", "Not sure yet"];
const laptopOsOptions = ["MacOS", "Windows", "Linux", "Other / Not sure"];
const referralSourceOptions = [
  "Google search",
  "Friend / student referral",
  "Parent referral",
  "Robotics team or club",
  "School recommendation",
  "Other",
];

type FieldControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const validationSummaryMessage =
  "Please review the highlighted fields below and correct any missing or invalid information before submitting.";

const sectionFieldMap = {
  medicalSafety: [
    "student_carries_medication",
    "medication_needs_details",
    "allergies",
    "medical_conditions",
    "current_medications",
    "dietary_restrictions",
  ],
  requiredAcknowledgements: [
    "ack_info_accuracy",
    "ack_safety_and_activity_risk",
    "ack_prompt_pickup",
    "ack_session_confirmation_threshold",
    "ack_reviewed_refund_policy",
  ],
  liabilityWaiver: ["liability_waiver_medical_consent_agreement"],
} as const;

const calculateAgeFromDateOfBirth = (dateValue: string): number | null => {
  if (!dateValue) {
    return null;
  }

  const [yearString, monthString, dayString] = dateValue.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const hasHadBirthdayThisYear =
    today.getMonth() > month - 1 || (today.getMonth() === month - 1 && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

const getTodayLocalIsoDate = (): string => {
  const now = new Date();
  const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 10);
};

const getValidationMessage = (field: FieldControl): string => {
  if (field.name === "student_age") {
    return field.validity.valueMissing
      ? "This field is required."
      : "Please enter a valid age between 8 and 18.";
  }

  if (field.name === "liability_waiver_medical_consent_agreement") {
    return "Please agree to the waiver before submitting.";
  }

  if (field.name === "student_carries_medication" || field.name === "photo_media_permission") {
    return "Please complete this section.";
  }

  if (field.name.startsWith("ack_")) {
    return "Please complete this section.";
  }

  if (field.name === "medication_needs_details") {
    return "Please describe the medication and any instructions Camp Asimov staff should know.";
  }

  if (field.validity.valueMissing) {
    return "This field is required.";
  }

  if (field.validity.typeMismatch && field.type === "email") {
    return "Please enter a valid email address.";
  }

  if (field.validity.typeMismatch || field.validity.patternMismatch) {
    return "Please enter valid information.";
  }

  if (field.validity.rangeOverflow || field.validity.rangeUnderflow) {
    return "Please enter a valid value.";
  }

  return "Please check this field.";
};

const getNamedControls = (form: HTMLFormElement) =>
  Array.from(form.querySelectorAll<FieldControl>("input[name], select[name], textarea[name]")).filter(
    (control) => control.name !== "_gotcha",
  );

const applyCustomRules = (form: HTMLFormElement) => {
  const controls = getNamedControls(form);
  controls.forEach((control) => control.setCustomValidity(""));

  const ageField = form.elements.namedItem("student_age");
  if (ageField instanceof HTMLInputElement) {
    const ageValue = ageField.value.trim();
    if (ageValue) {
      const age = Number(ageValue);
      if (!Number.isFinite(age) || age < 8 || age > 18) {
        ageField.setCustomValidity("Please enter a valid age between 8 and 18.");
      }
    }
  }

  const medicationDetailsField = form.elements.namedItem("medication_needs_details");
  const medicationCarryGroup = form.elements.namedItem("student_carries_medication");
  const medicationCarryValue =
    medicationCarryGroup instanceof RadioNodeList ? medicationCarryGroup.value : "";
  if (medicationDetailsField instanceof HTMLTextAreaElement) {
    if (medicationCarryValue === "Yes" && !medicationDetailsField.value.trim()) {
      medicationDetailsField.setCustomValidity(
        "Please describe the medication and any instructions Camp Asimov staff should know.",
      );
    }
  }

  const waiverField = form.elements.namedItem("liability_waiver_medical_consent_agreement");
  if (waiverField instanceof HTMLInputElement && !waiverField.checked) {
    waiverField.setCustomValidity("Please agree to the waiver before submitting.");
  }
};

const validateForm = (
  form: HTMLFormElement,
): { errors: Record<string, string>; firstInvalidField: FieldControl | null } => {
  applyCustomRules(form);

  const errors: Record<string, string> = {};
  let firstInvalidField: FieldControl | null = null;
  const controls = getNamedControls(form);
  const processedRadioGroups = new Set<string>();

  controls.forEach((control) => {
    if (!control.willValidate || control.disabled) {
      return;
    }

    if (control instanceof HTMLInputElement && control.type === "radio") {
      if (processedRadioGroups.has(control.name)) {
        return;
      }
      processedRadioGroups.add(control.name);
    }

    if (!control.checkValidity() && !errors[control.name]) {
      errors[control.name] = getValidationMessage(control);
      if (!firstInvalidField) {
        firstInvalidField = control;
      }
    }
  });

  return { errors, firstInvalidField };
};

export default function EnrollmentFormPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [medicationCarry, setMedicationCarry] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [laptopAccess, setLaptopAccess] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [roboticsOtherSelected, setRoboticsOtherSelected] = useState(false);
  const [programmingOtherSelected, setProgrammingOtherSelected] = useState(false);
  const [cadOtherSelected, setCadOtherSelected] = useState(false);
  const [roboticsOtherDetails, setRoboticsOtherDetails] = useState("");
  const [programmingOtherDetails, setProgrammingOtherDetails] = useState("");
  const [cadOtherDetails, setCadOtherDetails] = useState("");
  const [signatureDate, setSignatureDate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const hasFieldError = (fieldName: string) => Boolean(fieldErrors[fieldName]);

  const getLabelClassName = (fieldName: string) =>
    `block text-sm font-semibold ${hasFieldError(fieldName) ? "text-red-200" : "text-neutral-100"}`;

  const getGroupedFieldLabelClassName = (fieldName: string) =>
    `text-sm font-semibold ${hasFieldError(fieldName) ? "text-red-200" : "text-neutral-100"}`;

  const renderFieldError = (fieldName: string) => {
    if (!fieldErrors[fieldName]) {
      return null;
    }

    return (
      <p id={`${fieldName}-error`} className="mt-2 text-xs md:text-sm text-red-200" role="alert">
        {fieldErrors[fieldName]}
      </p>
    );
  };

  const sectionHasError = (fieldNames: readonly string[]) =>
    fieldNames.some((fieldName) => hasFieldError(fieldName));

  const sectionErrors = {
    medicalSafety: sectionHasError(sectionFieldMap.medicalSafety),
    requiredAcknowledgements: sectionHasError(sectionFieldMap.requiredAcknowledgements),
    liabilityWaiver: sectionHasError(sectionFieldMap.liabilityWaiver),
  };

  useEffect(() => {
    if (!signatureDate) {
      setSignatureDate(getTodayLocalIsoDate());
    }
  }, [signatureDate]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    const controls = getNamedControls(form);

    controls.forEach((control) => {
      const errorId = `${control.name}-error`;
      const hasError = Boolean(fieldErrors[control.name]);

      if (hasError) {
        control.setAttribute("aria-invalid", "true");
        control.setAttribute("data-invalid", "true");

        const describedBy = control.getAttribute("aria-describedby");
        if (!describedBy) {
          control.setAttribute("aria-describedby", errorId);
        } else if (!describedBy.split(" ").includes(errorId)) {
          control.setAttribute("aria-describedby", `${describedBy} ${errorId}`);
        }
      } else {
        control.removeAttribute("aria-invalid");
        control.removeAttribute("data-invalid");

        const describedBy = control.getAttribute("aria-describedby");
        if (!describedBy) {
          return;
        }

        const nextIds = describedBy.split(" ").filter((id) => id !== errorId);
        if (nextIds.length === 0) {
          control.removeAttribute("aria-describedby");
        } else {
          control.setAttribute("aria-describedby", nextIds.join(" "));
        }
      }
    });
  }, [fieldErrors]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;

    const { errors: validationErrors, firstInvalidField } = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setShowValidationSummary(true);
      setLoading(false);

      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => {
          firstInvalidField.focus({ preventScroll: true });
        }, 120);
      }

      return;
    }

    setFieldErrors({});
    setShowValidationSummary(false);

    const formData = new FormData(form);

    formData.set("liability_waiver_agreed", "Yes");
    formData.append("_subject", "Camp Asimov Enrollment Form Submission");

    try {
      const response = await fetch(FORMSPREE_ENROLLMENT_FORM_ACTION, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        setError("We could not submit the form. Please review your information and try again.");
        setShowValidationSummary(true);
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch {
      setError("We could not submit the form. Please review your information and try again.");
      setShowValidationSummary(true);
      setLoading(false);
    }
  };

  const handleFormFieldUpdate = () => {
    const form = formRef.current;
    if (!form || Object.keys(fieldErrors).length === 0) {
      return;
    }

    const { errors: nextErrors } = validateForm(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setShowValidationSummary(false);
    }
  };

  const handleDateOfBirthChange = (dateValue: string) => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    const ageField = form.elements.namedItem("student_age");
    if (!(ageField instanceof HTMLInputElement)) {
      return;
    }

    const calculatedAge = calculateAgeFromDateOfBirth(dateValue);
    ageField.value = calculatedAge === null ? "" : String(calculatedAge);

    handleFormFieldUpdate();
  };

  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">
          {submitted ? "Enrollment Confirmed" : "Camp Asimov Enrollment Form"}
        </h1>
        {submitted ? (
          <p className="mt-3 text-base md:text-lg text-neutral-200 leading-relaxed">
            Thank you for completing your enrollment form. We&apos;ll be in touch with next steps soon.
          </p>
        ) : (
          <>
            <p className="mt-3 text-base md:text-lg text-neutral-200 leading-relaxed">
              Thank you for reserving a seat in Camp Asimov. Please complete the form below so we can finalize your student&apos;s enrollment and prepare for the summer session.
            </p>
            <p className="mt-2 text-sm md:text-base text-neutral-300">
              This form should only be completed by families who have already submitted the enrollment deposit.
            </p>
          </>
        )}

        {submitted ? (
          <div
            className="mt-8 rounded-2xl border p-6 md:p-8 text-base md:text-lg leading-relaxed"
            style={{ borderColor: ink.line, background: "#0f141f" }}
          >
            <p>You&apos;re all set. We&apos;re excited to have you.</p>
            <p className="mt-3">
              Your Camp Asimov enrollment form has been received, and your student&apos;s spot is confirmed for the session.
            </p>
            <p className="mt-3">
              Over the coming weeks, we&apos;ll share program logistics, schedule details, and everything you&apos;ll need to prepare for the summer.
            </p>
            <p className="mt-3">If anything comes up, feel free to reach out.</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onChangeCapture={handleFormFieldUpdate}
            onBlurCapture={handleFormFieldUpdate}
            noValidate
            className="enrollment-form mt-8 rounded-2xl border p-6 md:p-8 space-y-8"
            style={{ borderColor: ink.line, background: "#0f141f" }}
          >
            <style jsx>{`
              .enrollment-form :is(input, select, textarea)[data-invalid="true"] {
                border-color: #f87171 !important;
                background-color: rgba(127, 29, 29, 0.22) !important;
                box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.45);
              }

              .enrollment-form :is(input[type="radio"], input[type="checkbox"])[data-invalid="true"] {
                outline: 2px solid rgba(248, 113, 113, 0.85);
                outline-offset: 2px;
              }
            `}</style>
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="_replyto" value={parentEmail} />
            <input type="hidden" name="email" value={parentEmail} />

            {showValidationSummary && (Object.keys(fieldErrors).length > 0 || error) ? (
              <div
                id="form-error-summary"
                role="alert"
                aria-live="assertive"
                className="rounded-lg border px-4 py-3 text-sm md:text-base text-red-100"
                style={{ borderColor: "#f87171", background: "rgba(127, 29, 29, 0.24)" }}
              >
                <p className="font-semibold">{validationSummaryMessage}</p>
                {error ? <p className="mt-2">{error}</p> : null}
              </div>
            ) : null}

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Session Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="session_enrolled" className={getLabelClassName("session_enrolled")}>Session Enrolled</label>
                  <select
                    id="session_enrolled"
                    name="session_enrolled"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  >
                    <option value="" disabled>Select a session</option>
                    {sessionOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {renderFieldError("session_enrolled")}
                </div>
                <div>
                  <label htmlFor="payment_email" className={getLabelClassName("payment_email_used_for_stripe_deposit")}>Email used for Stripe deposit payment</label>
                  <input
                    id="payment_email"
                    name="payment_email_used_for_stripe_deposit"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  />
                  {renderFieldError("payment_email_used_for_stripe_deposit")}
                  <p className="mt-2 text-xs md:text-sm text-neutral-300">
                    This helps us match your enrollment form with your reservation payment.
                  </p>
                </div>
              </div>
              <div className="mt-5 max-w-2xl space-y-5">
                <div>
                  <label htmlFor="laptop_access" className={getLabelClassName("laptop_access_for_program")}>
                    Does your child have access to a laptop they can bring to the program?
                  </label>
                  <select
                    id="laptop_access"
                    name="laptop_access_for_program"
                    required
                    value={laptopAccess}
                    onChange={(e) => setLaptopAccess(e.target.value)}
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  >
                    <option value="" disabled>Select one</option>
                    {laptopAccessOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {renderFieldError("laptop_access_for_program")}
                </div>
                {laptopAccess === "Yes" ? (
                  <div>
                    <label htmlFor="laptop_os" className={getLabelClassName("laptop_operating_system")}>
                      What operating system does the laptop use?
                    </label>
                    <select
                      id="laptop_os"
                      name="laptop_operating_system"
                      required={laptopAccess === "Yes"}
                      defaultValue=""
                      className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                      style={{ borderColor: ink.line }}
                    >
                      <option value="" disabled>Select one</option>
                      {laptopOsOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {renderFieldError("laptop_operating_system")}
                  </div>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Student Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="student_full_name" className={getLabelClassName("student_full_name")}>Student Full Name</label>
                  <input id="student_full_name" name="student_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("student_full_name")}
                </div>
                <div>
                  <label htmlFor="preferred_name" className="block text-sm font-semibold text-neutral-100">Preferred Name</label>
                  <input id="preferred_name" name="preferred_name" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="date_of_birth" className={getLabelClassName("date_of_birth")}>Date of Birth</label>
                  <input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    required
                    onChange={(e) => handleDateOfBirthChange(e.target.value)}
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  />
                  {renderFieldError("date_of_birth")}
                </div>
                <div>
                  <label htmlFor="student_age" className={getLabelClassName("student_age")}>Student Age</label>
                  <input id="student_age" name="student_age" type="number" min={8} max={18} required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("student_age")}
                  <p className={`mt-2 text-xs md:text-sm ${hasFieldError("student_age") ? "text-red-200" : "text-neutral-300"}`}>
                    Camp Asimov is targeted for children aged 10-15.
                  </p>
                </div>
                <div>
                  <label htmlFor="student_grade" className={getLabelClassName("student_grade_2026_2027")}>Grade for the 2026-2027 school year</label>
                  <select id="student_grade" name="student_grade_2026_2027" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select grade</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                  {renderFieldError("student_grade_2026_2027")}
                </div>
                <div>
                  <label htmlFor="tshirt_size" className={getLabelClassName("student_tshirt_size")}>Student T-shirt Size</label>
                  <select id="tshirt_size" name="student_tshirt_size" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select size</option>
                    {tshirtOptions.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {renderFieldError("student_tshirt_size")}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="student_school" className={getLabelClassName("student_school")}>School</label>
                  <input id="student_school" name="student_school" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("student_school")}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Parent / Guardian Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="parent_name_1" className={getLabelClassName("parent_guardian_full_name")}>Parent / Guardian Full Name</label>
                  <input id="parent_name_1" name="parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("parent_guardian_full_name")}
                </div>
                <div>
                  <label htmlFor="parent_email_1" className={getLabelClassName("parent_guardian_email")}>Parent / Guardian Email</label>
                  <input
                    id="parent_email_1"
                    name="parent_guardian_email"
                    type="email"
                    required
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  />
                  {renderFieldError("parent_guardian_email")}
                </div>
                <div>
                  <label htmlFor="parent_phone_1" className={getLabelClassName("parent_guardian_phone_number")}>Parent / Guardian Phone Number</label>
                  <input id="parent_phone_1" name="parent_guardian_phone_number" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("parent_guardian_phone_number")}
                </div>
                <div>
                  <label htmlFor="parent_name_2" className="block text-sm font-semibold text-neutral-100">Parent / Guardian 2 Name</label>
                  <input id="parent_name_2" name="parent_guardian_2_name" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="parent_email_2" className={getLabelClassName("parent_guardian_2_email")}>Parent / Guardian 2 Email</label>
                  <input id="parent_email_2" name="parent_guardian_2_email" type="email" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("parent_guardian_2_email")}
                </div>
                <div>
                  <label htmlFor="parent_phone_2" className="block text-sm font-semibold text-neutral-100">Parent / Guardian 2 Phone Number</label>
                  <input id="parent_phone_2" name="parent_guardian_2_phone_number" type="tel" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="home_address" className={getLabelClassName("home_address")}>Home Address</label>
                  <input id="home_address" name="home_address" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("home_address")}
                </div>
                <div>
                  <label htmlFor="city" className={getLabelClassName("city")}>City</label>
                  <input id="city" name="city" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("city")}
                </div>
                <div>
                  <label htmlFor="state" className={getLabelClassName("state")}>State</label>
                  <input id="state" name="state" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("state")}
                </div>
                <div>
                  <label htmlFor="zip_code" className={getLabelClassName("zip_code")}>ZIP Code</label>
                  <input id="zip_code" name="zip_code" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("zip_code")}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Emergency Contact + Authorized Pickup</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emergency_contact_name" className={getLabelClassName("emergency_contact_name")}>Emergency Contact Name</label>
                  <input id="emergency_contact_name" name="emergency_contact_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("emergency_contact_name")}
                </div>
                <div>
                  <label htmlFor="emergency_contact_phone" className={getLabelClassName("emergency_contact_phone")}>Emergency Contact Phone</label>
                  <input id="emergency_contact_phone" name="emergency_contact_phone" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("emergency_contact_phone")}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="emergency_relationship" className={getLabelClassName("relationship_to_student")}>Relationship to Student</label>
                  <input id="emergency_relationship" name="relationship_to_student" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("relationship_to_student")}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="authorized_pickup_adults" className="block text-sm font-semibold text-neutral-100">Additional authorized pickup adults</label>
                  <textarea id="authorized_pickup_adults" name="additional_authorized_pickup_adults" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  <p className="mt-2 text-xs md:text-sm text-neutral-300">
                    Please list any adults, besides the parent/guardian above, who are authorized to pick up your student.
                  </p>
                </div>
              </div>
            </section>

            <section
              className={sectionErrors.medicalSafety ? "rounded-lg border-l-2 border-red-400 pl-4" : undefined}
            >
              <h2 className={`text-lg md:text-xl font-semibold ${sectionErrors.medicalSafety ? "text-red-200" : ""}`}>
                Medical / Safety Information
              </h2>
              <p className="mt-2 text-xs md:text-sm text-neutral-300">
                Please provide any information that will help us safely support your student during hands-on activities.
              </p>
              {sectionErrors.medicalSafety ? (
                <p className="mt-2 text-xs md:text-sm text-red-200">Please complete this section.</p>
              ) : null}
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="allergies" className={getLabelClassName("allergies")}>Allergies</label>
                  <textarea id="allergies" name="allergies" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("allergies")}
                </div>
                <div>
                  <label htmlFor="medical_conditions" className={getLabelClassName("medical_conditions")}>Medical Conditions</label>
                  <textarea id="medical_conditions" name="medical_conditions" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("medical_conditions")}
                </div>
                <div>
                  <label htmlFor="current_medications" className={getLabelClassName("current_medications")}>
                    Medications your student takes or may need during the program
                  </label>
                  <textarea id="current_medications" name="current_medications" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("current_medications")}
                </div>
                <div>
                  <label htmlFor="dietary_restrictions" className={getLabelClassName("dietary_restrictions")}>Dietary Restrictions</label>
                  <textarea id="dietary_restrictions" name="dietary_restrictions" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("dietary_restrictions")}
                </div>
                <fieldset className="md:col-span-2">
                  <legend className={getGroupedFieldLabelClassName("student_carries_medication")}>
                    Will your student bring any medication to camp (for example: inhaler, EpiPen, etc.)?
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-neutral-100">
                      <input
                        type="radio"
                        name="student_carries_medication"
                        value="Yes"
                        required
                        checked={medicationCarry === "Yes"}
                        onChange={(e) => setMedicationCarry(e.target.value)}
                        className="h-4 w-4 accent-[#8fd7ff]"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-neutral-100">
                      <input
                        type="radio"
                        name="student_carries_medication"
                        value="No"
                        required
                        checked={medicationCarry === "No"}
                        onChange={(e) => setMedicationCarry(e.target.value)}
                        className="h-4 w-4 accent-[#8fd7ff]"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {renderFieldError("student_carries_medication")}
                </fieldset>
                {medicationCarry === "Yes" ? (
                  <div className="md:col-span-2">
                    <label htmlFor="medication_needs" className={getLabelClassName("medication_needs_details")}>
                      Please describe the medication and any instructions Camp Asimov staff should know.
                    </label>
                    <textarea
                      id="medication_needs"
                      name="medication_needs_details"
                      required={medicationCarry === "Yes"}
                      rows={3}
                      className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                      style={{ borderColor: ink.line }}
                    />
                    {renderFieldError("medication_needs_details")}
                  </div>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Learning / Support Information</h2>
              <div className="mt-4">
                <label htmlFor="student_support_notes" className="block text-sm font-semibold text-neutral-100">Is there anything we should know to help your student succeed in the program?</label>
                <textarea id="student_support_notes" name="student_support_notes" rows={4} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                <p className="mt-2 text-xs md:text-sm text-neutral-300">
                  This may include learning preferences, support needs, or anything else that would help us create the best possible experience.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Robotics / Technical Background</h2>
              <div className="mt-4 grid gap-5">
                <div>
                  <label htmlFor="robotics_experience_level" className={getLabelClassName("previous_robotics_experience_level")}>Previous Robotics Experience Level</label>
                  <select id="robotics_experience_level" name="previous_robotics_experience_level" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select one</option>
                    {roboticsLevelOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {renderFieldError("previous_robotics_experience_level")}
                </div>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">Previous Robotics Program(s)</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {roboticsProgramOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input
                          type="checkbox"
                          name="previous_robotics_programs[]"
                          value={option}
                          onChange={option === "Other" ? (e) => setRoboticsOtherSelected(e.target.checked) : undefined}
                          className="h-4 w-4 accent-[#8fd7ff]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {roboticsOtherSelected ? (
                    <div className="mt-3">
                      <label htmlFor="robotics_other_details" className="block text-sm font-semibold text-neutral-100">
                        Please add details
                      </label>
                      <input
                        id="robotics_other_details"
                        name="previous_robotics_programs_other_details"
                        type="text"
                        value={roboticsOtherDetails}
                        onChange={(e) => setRoboticsOtherDetails(e.target.value)}
                        className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                        style={{ borderColor: ink.line }}
                      />
                    </div>
                  ) : null}
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">Programming Experience</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {programmingOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input
                          type="checkbox"
                          name="programming_experience[]"
                          value={option}
                          onChange={option === "Other" ? (e) => setProgrammingOtherSelected(e.target.checked) : undefined}
                          className="h-4 w-4 accent-[#8fd7ff]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {programmingOtherSelected ? (
                    <div className="mt-3">
                      <label htmlFor="programming_other_details" className="block text-sm font-semibold text-neutral-100">
                        Please add details
                      </label>
                      <input
                        id="programming_other_details"
                        name="programming_experience_other_details"
                        type="text"
                        value={programmingOtherDetails}
                        onChange={(e) => setProgrammingOtherDetails(e.target.value)}
                        className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                        style={{ borderColor: ink.line }}
                      />
                    </div>
                  ) : null}
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">CAD Experience</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cadOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input
                          type="checkbox"
                          name="cad_experience[]"
                          value={option}
                          onChange={option === "Other" ? (e) => setCadOtherSelected(e.target.checked) : undefined}
                          className="h-4 w-4 accent-[#8fd7ff]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {cadOtherSelected ? (
                    <div className="mt-3">
                      <label htmlFor="cad_other_details" className="block text-sm font-semibold text-neutral-100">
                        Please add details
                      </label>
                      <input
                        id="cad_other_details"
                        name="cad_experience_other_details"
                        type="text"
                        value={cadOtherDetails}
                        onChange={(e) => setCadOtherDetails(e.target.value)}
                        className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                        style={{ borderColor: ink.line }}
                      />
                    </div>
                  ) : null}
                </fieldset>

                <div>
                  <label htmlFor="summer_build_goal" className={getLabelClassName("summer_build_goal")}>What is your student most excited to build or improve this summer?</label>
                  <textarea id="summer_build_goal" name="summer_build_goal" required rows={4} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("summer_build_goal")}
                </div>
                <div>
                  <label htmlFor="robotics_background_notes" className="block text-sm font-semibold text-neutral-100">Anything else you&apos;d like us to know about your student&apos;s robotics background?</label>
                  <textarea id="robotics_background_notes" name="robotics_background_notes" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Photo / Media Permission</h2>
              <fieldset className="mt-4">
                <legend className={getGroupedFieldLabelClassName("photo_media_permission")}>
                  I grant permission for Camp Asimov to photograph or record my student during the program for documentation or promotional purposes.
                </legend>
                <div className="mt-2 flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-100">
                    <input type="radio" name="photo_media_permission" value="Yes" required className="h-4 w-4 accent-[#8fd7ff]" />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-100">
                    <input type="radio" name="photo_media_permission" value="No" required className="h-4 w-4 accent-[#8fd7ff]" />
                    <span>No</span>
                  </label>
                </div>
                {renderFieldError("photo_media_permission")}
              </fieldset>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">How did you hear about Camp Asimov?</h2>
              <div className="mt-4 max-w-2xl space-y-4">
                <div>
                  <label htmlFor="referral_source" className={getLabelClassName("referral_source")}>
                    How did you hear about Camp Asimov?
                  </label>
                  <select
                    id="referral_source"
                    name="referral_source"
                    required
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  >
                    <option value="" disabled>Select one</option>
                    {referralSourceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {renderFieldError("referral_source")}
                </div>

                {(referralSource === "Friend / student referral" || referralSource === "Parent referral") ? (
                  <div>
                    <label htmlFor="referrer_name" className="block text-sm font-semibold text-neutral-100">
                      Who referred you to Camp Asimov?
                    </label>
                    <input
                      id="referrer_name"
                      name="referrer_name"
                      type="text"
                      className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                      style={{ borderColor: ink.line }}
                    />
                  </div>
                ) : null}

                <p className="text-sm text-neutral-300 leading-relaxed">
                  Many students enjoy attending Camp Asimov with a friend. When a student enrolls through a referral from an already enrolled family, both families receive a small tuition credit as a thank-you.
                </p>
              </div>
            </section>

            <section
              className={sectionErrors.requiredAcknowledgements ? "rounded-lg border-l-2 border-red-400 pl-4" : undefined}
            >
              <h2 className={`text-lg md:text-xl font-semibold ${sectionErrors.requiredAcknowledgements ? "text-red-200" : ""}`}>
                Required Acknowledgements
              </h2>
              {sectionErrors.requiredAcknowledgements ? (
                <p className="mt-2 text-xs md:text-sm text-red-200">Please complete this section.</p>
              ) : null}
              <div className="mt-4 space-y-3">
                <label
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    hasFieldError("ack_info_accuracy") ? "text-red-100" : "text-neutral-100"
                  }`}
                  style={{ borderColor: hasFieldError("ack_info_accuracy") ? "#f87171" : ink.line, background: "#111521" }}
                >
                  <input type="checkbox" name="ack_info_accuracy" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I confirm that the information in this form is accurate to the best of my knowledge.</span>
                </label>
                {renderFieldError("ack_info_accuracy")}
                <label
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    hasFieldError("ack_safety_and_activity_risk") ? "text-red-100" : "text-neutral-100"
                  }`}
                  style={{ borderColor: hasFieldError("ack_safety_and_activity_risk") ? "#f87171" : ink.line, background: "#111521" }}
                >
                  <input type="checkbox" name="ack_safety_and_activity_risk" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that Camp Asimov includes hands-on engineering and robotics activities involving tools, mechanical components, and electronics, and my student agrees to follow all safety instructions and program guidelines.</span>
                </label>
                {renderFieldError("ack_safety_and_activity_risk")}
                <label
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    hasFieldError("ack_prompt_pickup") ? "text-red-100" : "text-neutral-100"
                  }`}
                  style={{ borderColor: hasFieldError("ack_prompt_pickup") ? "#f87171" : ink.line, background: "#111521" }}
                >
                  <input type="checkbox" name="ack_prompt_pickup" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that my student must be picked up promptly at the end of each camp day unless otherwise arranged in writing.</span>
                </label>
                {renderFieldError("ack_prompt_pickup")}
                <label
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    hasFieldError("ack_session_confirmation_threshold") ? "text-red-100" : "text-neutral-100"
                  }`}
                  style={{ borderColor: hasFieldError("ack_session_confirmation_threshold") ? "#f87171" : ink.line, background: "#111521" }}
                >
                  <input type="checkbox" name="ack_session_confirmation_threshold" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that Camp Asimov sessions proceed once minimum enrollment is reached and that families will be notified when a session is confirmed.</span>
                </label>
                {renderFieldError("ack_session_confirmation_threshold")}
                <label
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                    hasFieldError("ack_reviewed_refund_policy") ? "text-red-100" : "text-neutral-100"
                  }`}
                  style={{ borderColor: hasFieldError("ack_reviewed_refund_policy") ? "#f87171" : ink.line, background: "#111521" }}
                >
                  <input type="checkbox" name="ack_reviewed_refund_policy" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I have reviewed the Camp Asimov refund policy at campasimov.com/refunds.</span>
                </label>
                {renderFieldError("ack_reviewed_refund_policy")}
              </div>
            </section>

            <section
              className={sectionErrors.liabilityWaiver ? "rounded-lg border-l-2 border-red-400 pl-4" : undefined}
            >
              <h2 className={`text-lg md:text-xl font-semibold ${sectionErrors.liabilityWaiver ? "text-red-200" : ""}`}>
                Liability Waiver and Medical Consent
              </h2>
              {sectionErrors.liabilityWaiver ? (
                <p className="mt-2 text-xs md:text-sm text-red-200">Please complete this section.</p>
              ) : null}
              <div className="mt-4 rounded-lg border px-4 py-4 text-sm md:text-base text-neutral-100 leading-relaxed space-y-4" style={{ borderColor: ink.line, background: "#111521" }}>
                <p>
                  I understand that participation in Camp Asimov involves hands-on engineering activities, including the use of tools, mechanical components, electronics, batteries, 3D printers, and soldering equipment, which carry inherent risks of injury.
                </p>
                <p>
                  I voluntarily assume all risks associated with my child&rsquo;s participation in the program.
                </p>
                <p>
                  I hereby release and hold harmless Camp Asimov LLC, its staff, instructors, assistants, and affiliates from any and all liability, claims, or damages arising from my child&rsquo;s participation in the program, except in cases of gross negligence or willful misconduct.
                </p>
                <p>
                  In the event of a medical emergency, I authorize Camp Asimov staff to obtain emergency medical treatment for my child if I cannot be reached.
                </p>
              </div>
              <label
                className={`mt-4 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                  hasFieldError("liability_waiver_medical_consent_agreement") ? "text-red-100" : "text-neutral-100"
                }`}
                style={{
                  borderColor: hasFieldError("liability_waiver_medical_consent_agreement") ? "#f87171" : ink.line,
                  background: "#111521",
                }}
              >
                <input
                  type="checkbox"
                  name="liability_waiver_medical_consent_agreement"
                  value="Yes"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#8fd7ff]"
                />
                <span>I agree to the Liability Waiver and Medical Consent above.</span>
              </label>
              {renderFieldError("liability_waiver_medical_consent_agreement")}
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Signature</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="signature_parent_name" className={getLabelClassName("signature_parent_guardian_full_name")}>Parent / Guardian Full Name</label>
                  <input id="signature_parent_name" name="signature_parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  {renderFieldError("signature_parent_guardian_full_name")}
                  <p className="mt-2 text-xs md:text-sm text-neutral-300">
                    Typing your full name serves as your electronic acknowledgment of this enrollment form.
                  </p>
                </div>
                <div>
                  <label htmlFor="signature_date" className={getLabelClassName("signature_date")}>Date</label>
                  <input
                    id="signature_date"
                    name="signature_date"
                    type="date"
                    required
                    value={signatureDate}
                    onChange={(e) => setSignatureDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  />
                  {renderFieldError("signature_date")}
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Button type="submit" disabled={loading} className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
                {loading ? "Submitting..." : "Complete Enrollment"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
