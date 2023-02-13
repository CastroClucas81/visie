import * as Yup from "yup";
import { matches } from "../utils/matches";

export const formProductValidationSchema = Yup.object().shape({
  price: Yup.string().min(1, "Too Short!").max(20, "Too Long!"),
  discountPercent: Yup.string().min(1, "Too Short!").max(4, "Too Long!"),
  rating: Yup.string().min(1, "Too Short!").max(4, "Too Long!"),
  stock: Yup.string()
    .matches(matches.onlyNumbers, "Must be only digits")
    .min(1, "Too Short!")
    .max(1000, "Too Long!"),
  thumbnail: Yup.string().matches(matches.url, "Enter correct URL!"),
  images: Yup.array().of(
    Yup.string().matches(matches.url, "Enter correct URL!")
  ),
});
