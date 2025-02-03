import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  clearTrigger: boolean; // New prop to trigger clearing
}

const CLOUD_NAME = "dcuiajhts";
const UPLOAD_PRESET = "assingment4";

export default function CloudinaryUpload({
  onUpload,
  clearTrigger,
}: CloudinaryUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for file input

  useEffect(() => {
    if (clearTrigger) {
      setImageUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input field
      }
    }
  }, [clearTrigger]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        onUpload(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Upload Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
      />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-32 h-32 mt-2 rounded" />
      )}
    </div>
  );
}
