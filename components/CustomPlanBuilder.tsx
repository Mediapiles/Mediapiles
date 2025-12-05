// components/CustomPlanBuilder.tsx

"use client";
import { useState, useEffect } from "react";
import React from 'react';

// Define the shape of the features state for better type safety
type Feature = string;

export default function CustomPlanBuilder() {
  const [budget, setBudget] = useState("100");
  const [platform, setPlatform] = useState("");
  const [features, setFeatures] = useState<Feature[]>([]); // Use string array for features
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");


  const toggleFeature = (item: Feature) => {
    setFeatures((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = {
      budget: budget,
      platform: platform,
      features: features.join(', '), // Send as a comma-separated string
      notes: notes,
    };
    
    // --- **IMPORTANT:** Replace this dummy API call with your actual endpoint ---
    try {
        // Example: Sending data to a Resend API route (if you set one up)
        // const response = await fetch('/api/send-email', { 
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // });

        // if (response.ok) {
        //     setSubmitMessage("✅ Success! Your custom plan request has been sent.");
        //     // Optionally reset form fields here
        // } else {
        //     setSubmitMessage("❌ Error: Failed to send request. Please try again.");
        // }

        // --- Simulated success for now ---
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        console.log("Form Data Submitted:", formData);
        setSubmitMessage("✅ Success! Your custom plan request has been submitted (Simulated).");

    } catch (error) {
        setSubmitMessage("❌ Critical Error: Could not connect to the server.");
    } finally {
        setIsSubmitting(false);
    }
    // -------------------------------------------------------------------------
  };


  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <h2 className="text-4xl font-bold mb-4">Build Your Custom Plan</h2>
        <p className="text-gray-300 mb-10">
          Customize your requirements and we'll deliver a tailored solution with perfect precision.
        </p>

        {/* FORM GRID */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* FORM LEFT (Inputs) */}
          <div className="md:col-span-2 space-y-8">

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block mb-2 font-semibold">Your Budget ($)</label>
              <input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none"
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block mb-2 font-semibold">Choose Platform</label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none"
              >
                <option value="">Select one</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Gaming Stream">Gaming Stream</option>
                <option value="Esports Organization">Esports Organization</option>
              </select>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block mb-2 font-semibold">Add-ons</label>

              <div className="grid grid-cols-2 gap-4">
                {["Thumbnail Pack", "Banner Design", "Logo", "Editing", "Animations", "Brand Kit"].map(
                  (item) => (
                    <button
                      type="button" // Important: Prevents button from submitting the form
                      key={item}
                      onClick={() => toggleFeature(item)}
                      className={`p-3 rounded border transition ${
                        features.includes(item)
                          ? "bg-purple-600 border-purple-400 hover:bg-purple-500"
                          : "bg-gray-900 border-gray-700 hover:bg-gray-800"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block mb-2 font-semibold">Extra Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none"
                placeholder="Write any custom requirements here..."
              ></textarea>
            </div>
            
            {/* Submit Message */}
            {submitMessage && (
                <p className={`p-3 rounded-lg font-semibold ${submitMessage.startsWith("✅") ? "bg-green-600/20 text-green-400 border border-green-400" : "bg-red-600/20 text-red-400 border border-red-400"}`}>
                    {submitMessage}
                </p>
            )}

          </div>

          {/* SUMMARY CARD (Right Side) */}
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl h-fit sticky top-10">
            <h3 className="text-2xl font-bold mb-4">Your Summary</h3>

            <p className="mb-2"><strong>Budget:</strong> ${budget}</p>
            <p className="mb-2"><strong>Platform:</strong> {platform || "Not selected"}</p>

            <p className="font-semibold mt-4 mb-1">Add-ons:</p>
            {features.length > 0 ? (
              <ul className="list-disc ml-5 text-gray-300">
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No add-ons selected</p>
            )}

            <p className="mt-6 text-gray-400">
              <strong>Notes:</strong> {notes || "No notes added"}
            </p>

            {/* CTA */}
            <button 
              type="submit" 
              className="w-full mt-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Finalize Order"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}