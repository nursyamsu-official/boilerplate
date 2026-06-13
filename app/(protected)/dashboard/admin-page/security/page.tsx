import { redirect } from "next/navigation";

export default function SecurityPage() {
  redirect("/dashboard/admin-page/security/sessions");
}
