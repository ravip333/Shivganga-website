import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import type { MediaCategory, PhotoItem } from '../../types';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadPhotos: (newPhotos: PhotoItem[], targetCategory: MediaCategory) => void;
  initialCategory?: MediaCategory;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadPhotos,
  initialCategory = 'holi',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>(
    initialCategory === 'all' || initialCategory === 'videos' ? 'holi' : initialCategory
  );
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [previews, setPreviews] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const categoryOptions: { id: MediaCategory; label: string; badge: string }[] = [
    { id: 'holi', label: 'Holi Celebration', badge: 'Color Festival' },
    { id: 'mens_day', label: "Men's Day Celebration", badge: 'Community Meet' },
    { id: 'festivals', label: 'Diwali & Festive Illumination', badge: 'Lighting' },
    { id: 'national', label: 'Republic & Independence Day', badge: 'Flag Hoisting' },
    { id: 'elevation', label: 'Building Elevation (G+6)', badge: 'Architecture' },
    { id: 'parking', label: 'Dedicated Parking & Campus', badge: 'Ground Level' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select valid image files (JPG, PNG, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviews((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previews.length === 0) {
      setErrorMsg('Please select at least one photo to upload.');
      return;
    }

    const matchedCategory = categoryOptions.find((c) => c.id === selectedCategory);
    const categoryLabel = matchedCategory?.label || 'Society Event';

    const newPhotoItems: PhotoItem[] = previews.map((dataUrl, idx) => ({
      id: `user-upload-${Date.now()}-${idx}`,
      title: title.trim() || `${categoryLabel} Photo ${idx + 1}`,
      category: selectedCategory,
      categoryLabel: categoryLabel,
      imageUrl: dataUrl,
      caption: caption.trim() || `Uploaded photo from ${categoryLabel}`,
      date: date.trim() || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      featured: idx === 0,
    }));

    onUploadPhotos(newPhotoItems, selectedCategory);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPreviews([]);
      setTitle('');
      setCaption('');
      setDate('');
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 id="upload-modal-title" className="text-base sm:text-lg font-serif font-bold text-slate-900">
                Upload Society Photos
              </h3>
              <p className="text-xs text-slate-500">
                Add celebration photos for Holi, Men's Day, Diwali, or Campus.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-semibold">Photos added successfully! Updating gallery...</span>
            </div>
          )}

          {/* 1. Category Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              1. Select Celebration / Photo Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoryOptions.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <span className="block text-xs font-bold leading-snug">{cat.label}</span>
                    <span className="text-[10px] text-slate-500">{cat.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Photo File Picker & Dropzone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              2. Choose Photos From Your Device *
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/60 hover:bg-emerald-50/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs mx-auto mb-3 flex items-center justify-center text-slate-500 group-hover:text-emerald-700 group-hover:scale-105 transition-all">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                Click to browse or drop your photos here
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports multiple JPG, PNG, and WebP images
              </p>
            </div>

            {/* Preview Grid */}
            {previews.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700">
                    Selected Photos ({previews.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviews([])}
                    className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {previews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePreview(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                        aria-label="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Photo Title / Event Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Holi 2026 Celebration with Neighbors"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Celebration Date / Year
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. March 2026 or Diwali 2025"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Brief Caption / Description (Optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Joyful gathering of resident families in the society campus."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            />
          </div>

          {/* Guidelines note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Uploaded celebration photos will appear immediately in the photo gallery and are saved in your browser.
            </span>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={previews.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-emerald-900/10"
            >
              <Upload className="w-4 h-4" />
              <span>Add to Society Gallery ({previews.length})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
