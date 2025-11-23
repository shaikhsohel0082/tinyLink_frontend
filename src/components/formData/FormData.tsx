import { useState } from "react";
import { toast } from "react-toastify";
import useCreateLink from "../../hooks/useCreateLinks";
import type { ICreateLink } from "../../service/link/createLink";
import { validateUrl } from "../../utils";
import styles from "./FormData.module.scss";
const FormData = () => {
  const [formData, setFormData] = useState<ICreateLink>({ url: "", code: "" });
  const [error, setError] = useState<Array<string>>([]);
  const handleOnChange = (key: keyof ICreateLink, val: string) => {
    setFormData((prev) => {
      if (prev) {
        return { ...prev, [key]: val };
      }
      return { [key]: val } as ICreateLink;
    });
  };
  const { isLoading, createMutation } = useCreateLink();

  const validatePayload = () => {
    if (!formData?.url || !validateUrl(formData?.url)) {
      setError((prev) => {
        const error = [...prev];
        error.push("url");
        return error;
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    const isValid = validatePayload();
    if (isValid) {
      try {
        await createMutation.mutateAsync(formData);
        toast.success("Url created!");
        setFormData({ url: "", code: "" });
      } catch (err) {
        toast.error(err + "");
      }
    }
  };
  return (
    <div className={styles.urlForm}>
      <div className={styles.formRow}>
        <label htmlFor="url">Enter URL:</label>
        <input
          type="url"
          className={`form-control  ${
            error.includes("url") ? "border-danger" : ""
          }`}
          placeholder={"https://www.google.com"}
          onChange={(e) => {
            handleOnChange("url", e.target.value);
            setError([]);
          }}
          value={formData?.url}
        />
        {error.includes("url") && (
          <span className="text-danger fs-6 ">
            Invalid Url! Please enter a valid Url.
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="code">
          Custom Code <span className={styles.optText}>(Optional)</span>:
        </label>
        <input
          type="text"
          className={`form-control `}
          placeholder={"mycode"}
          onChange={(e) => {
            handleOnChange("code", e.target.value);
          }}
          value={formData?.code}
        />
      </div>

      <button
        className={`btn btn-success w-25 align-self-center mt-4`}
        onClick={handleSubmit}
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default FormData;
