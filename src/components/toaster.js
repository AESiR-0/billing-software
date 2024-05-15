import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function enqueToaster(text) {
  toast(text, { autoClose: 4000 });
}
