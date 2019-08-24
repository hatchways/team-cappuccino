import { addItem } from "../api/index.js";

export default function uploadItem(body, makeSnackBar, reloadData) {
  addItem(body).then(data => {
    if (data.error) {
      makeSnackBar("Item upload failed");
      console.log(data.error);
    } else {
      makeSnackBar("Item uploaded successfully");
      reloadData();
      reloadData();
    }
  });
}
