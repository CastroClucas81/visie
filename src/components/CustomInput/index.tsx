import { Field, FieldProps } from "formik";
import InputMask from "react-input-mask";
import { NumericFormat } from "react-number-format";
import { NumberFormatValues } from "react-number-format/types/types";

type CustomInputProps = {
  hasError?: string | boolean | undefined;
  messageError?: string;
  name: string;
  type?: string;
  label: string;
  value?: string | number;
  mask?: string;
  placeholder?: string;
  isCurrency?: boolean;
  onChangeValue?: (values: NumberFormatValues) => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  hasError,
  type = "text",
  messageError,
  name,
  label,
  value,
  mask = "",
  placeholder,
  isCurrency = false,
  onChangeValue,
  onChange,
}: CustomInputProps) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <Field name={name}>
        {({ field }: FieldProps) =>
          isCurrency ? (
            <NumericFormat
              {...field}
              value={value}
              placeholder={placeholder}
              prefix="R$ "
              thousandSeparator="."
              fixedDecimalScale
              decimalScale={2}
              decimalSeparator=","
              allowLeadingZeros
              className={`form-control ${hasError ? "is-invalid" : ""}`}
              onValueChange={onChangeValue}
            />
          ) : onChange ? (
            <InputMask
              {...field}
              maskChar=""
              placeholder={placeholder}
              mask={mask}
              type={type}
              className={`form-control ${hasError ? "is-invalid" : ""}`}
              value={value}
              onChange={onChange}
            />
          ) : (
            <InputMask
              {...field}
              maskChar=""
              placeholder={placeholder}
              mask={mask}
              type={type}
              className={`form-control ${hasError ? "is-invalid" : ""}`}
              value={value}
            />
          )
        }
      </Field>
      {hasError ? <div className="invalid-feedback">{messageError}</div> : null}
    </div>
  );
};

export default CustomInput;
