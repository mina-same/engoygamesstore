"use client"; // This directive ensures this component is a Client Component

import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

interface DynamicFormProps {
  fields: any[]; // Array of dynamic fields
  currentLang: string; // Language to decide field labels
  submitForm: () => void; // Function to handle form submission
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  currentLang,
  submitForm,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    // Initialize form data based on fields
    const initialData = fields.reduce((acc: any, field: any) => {
      acc[field.fieldName] = field.fieldType === "image" ? [] : ""; // Initialize empty array for images
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prevState: any) => ({
        ...prevState,
        [fieldName]: [...prevState[fieldName], file],
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          [fieldName]: [
            ...(prevPreviews[fieldName] || []),
            reader.result as string,
          ],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMoreClick = (fieldName: string) => {
    // Trigger file input click
    const fileInput = document.getElementById(
      `input-${fieldName}`
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data submitted:", formData);
  };

  const handleDeleteImage = (fieldName: string, index: number) => {
    // Remove the image from the previews
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...(prevPreviews[fieldName] || [])];
      updatedPreviews.splice(index, 1);
      return {
        ...prevPreviews,
        [fieldName]: updatedPreviews,
      };
    });

    // Remove the corresponding file from the form data
    setFormData((prevState: any) => {
      const updatedFiles = [...(prevState[fieldName] || [])];
      updatedFiles.splice(index, 1);
      return {
        ...prevState,
        [fieldName]: updatedFiles,
      };
    });
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        {fields.map((field: any) => (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.fieldName} className="text-white">
              {currentLang === "ar" ? field.fieldName : field.fieldNameEn}
            </label>
            {field.fieldType === "image" ? (
              <div className="mt-2">
                <input
                  type="file"
                  id={`input-${field.fieldName}`}
                  name={field.fieldName}
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, field.fieldName)}
                  className="hidden"
                />

                <div className="grid grid-cols-5 gap-3">
                  {/* Render Image Previews */}
                  {imagePreviews[field.fieldName]?.map((src, index) => (
                    <div
                      key={`${field.fieldName}-${index}`}
                      className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        onClick={() =>
                          handleDeleteImage(field.fieldName, index)
                        }
                      >
                        ✕
                      </button>
                      {/* Image Preview */}
                      <Image
                        src={src}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    </div>
                  ))}

                  {/* Add Image Button */}
                  <div
                    className="flex items-center justify-center w-32 h-32 border border-gray-300 rounded-lg bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => handleAddMoreClick(field.fieldName)}
                  >
                    <span className="text-black flex flex-col items-center gap-1">
                      <IoMdAddCircleOutline className="text-2xl font-bold" />
                      <span>Add image</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : field.fieldType === "dropdown" ? (
              <select
                id={field.fieldName}
                name={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) =>
                  setFormData((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="mt-2 p-2 w-full rounded-lg border bg-white border-gray-300"
              >
                <option value="">Select an option</option>
                {field.options?.map((option: string, index: number) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.fieldType}
                id={field.fieldName}
                name={field.fieldName}
                value={formData[field.fieldName] || ""}
                onChange={(e) =>
                  setFormData((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="mt-2 p-2 w-full rounded-lg border bg-white border-gray-300"
                placeholder={
                  currentLang === "ar"
                    ? `${field.fieldName}`
                    : `${field.fieldNameEn}`
                }
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default DynamicForm;
