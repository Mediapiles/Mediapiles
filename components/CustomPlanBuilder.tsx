// components/CustomPlanBuilder.tsx

"use client";
import { useState } from "react";

export default function CustomPlanBuilder() {
  const [budget, setBudget] = useState("100");
  const [platform, setPlatform] = useState("");
  const [features, setFeatures] = useState([]);
  const [notes, setNotes] = useState("");

  const toggleFeature = (item: string) => {
    setFeatures((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <h2 className="text-4xl font-bold mb-4">Build Your Custom Plan</h2>
        <p className="text-gray-300 mb-10">
          Customize your requirements and we'll deliver a tailored solution with perfect precision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* FORM LEFT */}
          <div className="md:col-span-2 space-y-8">

            {/* Budget */}
            <div>
              <label className="block mb-2 font-semibold">Your Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block mb-2 font-semibold">Choose Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
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
                      key={item}
                      onClick={() => toggleFeature(item)}
                      className={`p-3 rounded border ${
                        features.includes(item)
                          ? "bg-purple-600 border-purple-400"
                          : "bg-gray-900 border-gray-700"
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
              <label className="block mb-2 font-semibold">Extra Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
                placeholder="Write any custom requirements here..."
              ></textarea>
            </div>

          </div>

          {/* SUMMARY CARD */}
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
            <button className="w-full mt-8 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-lg">
              Finalize Order
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
