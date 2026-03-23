"use client";

import { FormEvent, useState } from "react";

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

export default function EnrollmentFormPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [medicationCarry, setMedicationCarry] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [laptopAccess, setLaptopAccess] = useState("");
  const [referralSource, setReferralSource] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const liabilityWaiverAgreed = formData.get("liability_waiver_medical_consent_agreement") === "Yes";

    if (!liabilityWaiverAgreed) {
      setError("Please agree to the Liability Waiver and Medical Consent to continue.");
      setLoading(false);
      return;
    }

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
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Camp Asimov Enrollment Form</h1>
        <p className="mt-3 text-base md:text-lg text-neutral-200 leading-relaxed">
          Thank you for reserving a seat in Camp Asimov. Please complete the form below so we can finalize your student&apos;s enrollment and prepare for the summer session.
        </p>
        <p className="mt-2 text-sm md:text-base text-neutral-300">
          This form should only be completed by families who have already submitted the enrollment deposit.
        </p>

        {submitted ? (
          <div
            className="mt-8 rounded-2xl border p-6 md:p-8 text-base md:text-lg leading-relaxed"
            style={{ borderColor: ink.line, background: "#0f141f" }}
          >
            Thank you. Your Camp Asimov enrollment form has been received. We&apos;ll follow up with additional details as we finalize the summer session.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border p-6 md:p-8 space-y-8"
            style={{ borderColor: ink.line, background: "#0f141f" }}
          >
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="_replyto" value={parentEmail} />
            <input type="hidden" name="email" value={parentEmail} />

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Session Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="session_enrolled" className="block text-sm font-semibold text-neutral-100">Session Enrolled</label>
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
                </div>
                <div>
                  <label htmlFor="payment_email" className="block text-sm font-semibold text-neutral-100">Email used for Stripe deposit payment</label>
                  <input
                    id="payment_email"
                    name="payment_email_used_for_stripe_deposit"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                    style={{ borderColor: ink.line }}
                  />
                  <p className="mt-2 text-xs md:text-sm text-neutral-300">
                    This helps us match your enrollment form with your reservation payment.
                  </p>
                </div>
              </div>
              <div className="mt-5 max-w-2xl space-y-5">
                <div>
                  <label htmlFor="laptop_access" className="block text-sm font-semibold text-neutral-100">
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
                </div>
                {laptopAccess === "Yes" ? (
                  <div>
                    <label htmlFor="laptop_os" className="block text-sm font-semibold text-neutral-100">
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
                  </div>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Student Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="student_full_name" className="block text-sm font-semibold text-neutral-100">Student Full Name</label>
                  <input id="student_full_name" name="student_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="preferred_name" className="block text-sm font-semibold text-neutral-100">Preferred Name</label>
                  <input id="preferred_name" name="preferred_name" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-semibold text-neutral-100">Date of Birth</label>
                  <input id="date_of_birth" name="date_of_birth" type="date" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="student_age" className="block text-sm font-semibold text-neutral-100">Student Age</label>
                  <input id="student_age" name="student_age" type="number" min={8} max={18} required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="student_grade" className="block text-sm font-semibold text-neutral-100">Grade for the 2026-2027 school year</label>
                  <select id="student_grade" name="student_grade_2026_2027" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select grade</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tshirt_size" className="block text-sm font-semibold text-neutral-100">Student T-shirt Size</label>
                  <select id="tshirt_size" name="student_tshirt_size" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select size</option>
                    {tshirtOptions.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="student_school" className="block text-sm font-semibold text-neutral-100">School</label>
                  <input id="student_school" name="student_school" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Parent / Guardian Information</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="parent_name_1" className="block text-sm font-semibold text-neutral-100">Parent / Guardian Full Name</label>
                  <input id="parent_name_1" name="parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="parent_email_1" className="block text-sm font-semibold text-neutral-100">Parent / Guardian Email</label>
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
                </div>
                <div>
                  <label htmlFor="parent_phone_1" className="block text-sm font-semibold text-neutral-100">Parent / Guardian Phone Number</label>
                  <input id="parent_phone_1" name="parent_guardian_phone_number" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="parent_name_2" className="block text-sm font-semibold text-neutral-100">Parent / Guardian 2 Name</label>
                  <input id="parent_name_2" name="parent_guardian_2_name" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="parent_email_2" className="block text-sm font-semibold text-neutral-100">Parent / Guardian 2 Email</label>
                  <input id="parent_email_2" name="parent_guardian_2_email" type="email" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="parent_phone_2" className="block text-sm font-semibold text-neutral-100">Parent / Guardian 2 Phone Number</label>
                  <input id="parent_phone_2" name="parent_guardian_2_phone_number" type="tel" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="home_address" className="block text-sm font-semibold text-neutral-100">Home Address</label>
                  <input id="home_address" name="home_address" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-neutral-100">City</label>
                  <input id="city" name="city" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-neutral-100">State</label>
                  <input id="state" name="state" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="zip_code" className="block text-sm font-semibold text-neutral-100">ZIP Code</label>
                  <input id="zip_code" name="zip_code" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Emergency Contact + Authorized Pickup</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emergency_contact_name" className="block text-sm font-semibold text-neutral-100">Emergency Contact Name</label>
                  <input id="emergency_contact_name" name="emergency_contact_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="emergency_contact_phone" className="block text-sm font-semibold text-neutral-100">Emergency Contact Phone</label>
                  <input id="emergency_contact_phone" name="emergency_contact_phone" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="emergency_relationship" className="block text-sm font-semibold text-neutral-100">Relationship to Student</label>
                  <input id="emergency_relationship" name="relationship_to_student" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
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

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Medical / Safety Information</h2>
              <p className="mt-2 text-xs md:text-sm text-neutral-300">
                Please provide any information that will help us safely support your student during hands-on activities.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="allergies" className="block text-sm font-semibold text-neutral-100">Allergies</label>
                  <textarea id="allergies" name="allergies" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="medical_conditions" className="block text-sm font-semibold text-neutral-100">Medical Conditions</label>
                  <textarea id="medical_conditions" name="medical_conditions" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="current_medications" className="block text-sm font-semibold text-neutral-100">
                    Medications your student takes or may need during the program
                  </label>
                  <textarea id="current_medications" name="current_medications" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <div>
                  <label htmlFor="dietary_restrictions" className="block text-sm font-semibold text-neutral-100">Dietary Restrictions</label>
                  <textarea id="dietary_restrictions" name="dietary_restrictions" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
                <fieldset className="md:col-span-2">
                  <legend className="block text-sm font-semibold text-neutral-100">
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
                </fieldset>
                {medicationCarry === "Yes" ? (
                  <div className="md:col-span-2">
                    <label htmlFor="medication_needs" className="block text-sm font-semibold text-neutral-100">
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
                  <label htmlFor="robotics_experience_level" className="block text-sm font-semibold text-neutral-100">Previous Robotics Experience Level</label>
                  <select id="robotics_experience_level" name="previous_robotics_experience_level" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                    <option value="" disabled>Select one</option>
                    {roboticsLevelOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">Previous Robotics Program(s)</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {roboticsProgramOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input type="checkbox" name="previous_robotics_programs[]" value={option} className="h-4 w-4 accent-[#8fd7ff]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">Programming Experience</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {programmingOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input type="checkbox" name="programming_experience[]" value={option} className="h-4 w-4 accent-[#8fd7ff]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block text-sm font-semibold text-neutral-100">CAD Experience</legend>
                  <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cadOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                        <input type="checkbox" name="cad_experience[]" value={option} className="h-4 w-4 accent-[#8fd7ff]" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="summer_build_goal" className="block text-sm font-semibold text-neutral-100">What is your student most excited to build or improve this summer?</label>
                  <textarea id="summer_build_goal" name="summer_build_goal" required rows={4} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
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
                <legend className="block text-sm font-semibold text-neutral-100">
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
              </fieldset>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">How did you hear about Camp Asimov?</h2>
              <div className="mt-4 max-w-2xl space-y-4">
                <div>
                  <label htmlFor="referral_source" className="block text-sm font-semibold text-neutral-100">
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

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Required Acknowledgements</h2>
              <div className="mt-4 space-y-3">
                <label className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                  <input type="checkbox" name="ack_info_accuracy" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I confirm that the information in this form is accurate to the best of my knowledge.</span>
                </label>
                <label className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                  <input type="checkbox" name="ack_safety_and_activity_risk" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that Camp Asimov includes hands-on engineering and robotics activities involving tools, mechanical components, and electronics, and my student agrees to follow all safety instructions and program guidelines.</span>
                </label>
                <label className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                  <input type="checkbox" name="ack_prompt_pickup" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that my student must be picked up promptly at the end of each camp day unless otherwise arranged in writing.</span>
                </label>
                <label className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                  <input type="checkbox" name="ack_session_confirmation_threshold" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I understand that Camp Asimov sessions proceed once minimum enrollment is reached and that families will be notified when a session is confirmed.</span>
                </label>
                <label className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                  <input type="checkbox" name="ack_reviewed_refund_policy" required className="mt-0.5 h-4 w-4 accent-[#8fd7ff]" />
                  <span>I have reviewed the Camp Asimov refund policy at campasimov.com/refunds.</span>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Liability Waiver and Medical Consent</h2>
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
              <label className="mt-4 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm text-neutral-100" style={{ borderColor: ink.line, background: "#111521" }}>
                <input
                  type="checkbox"
                  name="liability_waiver_medical_consent_agreement"
                  value="Yes"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#8fd7ff]"
                />
                <span>I agree to the Liability Waiver and Medical Consent above.</span>
              </label>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold">Signature</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="signature_parent_name" className="block text-sm font-semibold text-neutral-100">Parent / Guardian Full Name</label>
                  <input id="signature_parent_name" name="signature_parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                  <p className="mt-2 text-xs md:text-sm text-neutral-300">
                    Typing your full name serves as your electronic acknowledgment of this enrollment form.
                  </p>
                </div>
                <div>
                  <label htmlFor="signature_date" className="block text-sm font-semibold text-neutral-100">Date</label>
                  <input id="signature_date" name="signature_date" type="date" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Button type="submit" disabled={loading} className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
                {loading ? "Submitting..." : "Complete Enrollment"}
              </Button>
            </div>

            {error ? <p className="text-sm text-neutral-200">{error}</p> : null}
          </form>
        )}
      </div>
    </section>
  );
}
