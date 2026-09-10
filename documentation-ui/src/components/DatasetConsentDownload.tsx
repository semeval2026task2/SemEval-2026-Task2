// components/DatasetConsentDownload.tsx
import { useState } from "react";

interface DownloadItem {
  label: string;
  url: string;
}

const downloads: DownloadItem[] = [
  {
    label: "⬇ Download EmoVAL Dataset (ZIP)",
    url: "https://download-directory.github.io/?url=https://github.com/semeval2026task2/EmotionValArouTimeVariation2026/tree/main/datasets",
  },
];

export default function DatasetConsentDownload() {
  const [showModal, setShowModal] = useState(false);
  const [consented, setConsented] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="not-prose">
      <h1 className="text-5xl font-extrabold mb-2">Get Data</h1>
      <hr className="my-4 border-t border-gray-300" />
      <p className="mb-6 text-xl text-muted-foreground">
        Download the <strong>EmoVAL (Emotional Valence and Arousal Longitudinal
        language)</strong> dataset
      </p>
      

      <div className="text-center my-6">
        {!confirmed && (
          <div className="text-left">
            <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >
            Download EmoVAL Dataset
            </button>
        </div>

        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-[90%] shadow-xl text-left">
              <h2 className="font-bold text-3xl mb-3">Disclaimer & Usage Terms</h2>

              <h3 className="font-semibold mb-1">Disclaimer about the Datasets</h3>
              <ul className="list-disc pl-5 mb-3 text-sm">
                <li>Organizers and affiliated institutions provide no warranties on dataset correctness or completeness.</li>
                <li>They are not liable for dataset access or usage.</li>
              </ul>

              <h3 className="font-semibold mb-1">Dataset Usage Restrictions</h3>
              <ul className="list-disc pl-5 mb-4 text-sm">
                <li>Datasets should be used only for scientific or research purposes.</li>
                <li>Any other use is explicitly prohibited.</li>
                <li>Datasets must not be redistributed or shared with third parties.</li>
                <li>Interested parties should be directed to the official website.</li>
              </ul>

              <label className="flex items-center gap-2 font-medium mb-4">
                <input
                  type="checkbox"
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
                />
                I have read and consent to the above terms.
              </label>

              <button
                disabled={!consented}
                onClick={() => {
                  setShowModal(false);
                  setConfirmed(true);
                }}
                className={`px-4 py-2 rounded-md font-semibold text-white ${
                  consented ? "bg-green-600 cursor-pointer" : "bg-green-600/40 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {confirmed && (
          <div className="flex flex-col items-left gap-4">
            {downloads.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.shields.io/badge/${encodeURIComponent(item.label)}-2ea44f?style=for-the-badge`}
                  alt={item.label}
                />
              </a>
            ))}
          </div>
        )}
      </div>

      <section className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
        <h2 className="mb-2 text-xl font-bold">Dataset Usage Restrictions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
          <li>Datasets should be used only for scientific or research purposes.</li>
          <li>Any other use is explicitly prohibited.</li>
          <li>Datasets must not be redistributed or shared with third parties.</li>
          <li>Interested parties should be directed to the official website.</li>
        </ul>
      </section>
    </div>
  );
}