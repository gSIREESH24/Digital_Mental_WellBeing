import { useState, useRef } from "react";
import { Button } from "@/Inst/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Inst/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { Label } from "@/Inst/components/ui/label";

interface ImageUploadProps {
  value?: string;
  onChange?: (base64: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image", className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onChange?.(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="flex items-center gap-4 mt-2">
        {preview ? (
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={preview} alt="Preview" />
              <AvatarFallback>IMG</AvatarFallback>
            </Avatar>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={handleRemove}
              data-testid="button-remove-image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            data-testid="input-file"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            data-testid="button-upload"
          >
            {preview ? "Change Image" : "Choose Image"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            JPG, PNG or GIF. Max 5MB.
          </p>
        </div>
      </div>
    </div>
  );
}
