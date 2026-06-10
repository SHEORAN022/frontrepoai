import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageUpload = ({ images, setImages, maxFiles = 5 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages].slice(0, maxFiles));
  }, [maxFiles, setImages]);

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - images.length,
    multiple: true
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
        <p className="text-gray-600">Drag & drop images here, or click to select</p>
        <p className="text-sm text-gray-400 mt-1">Upload up to {maxFiles} images</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img src={img.preview} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;