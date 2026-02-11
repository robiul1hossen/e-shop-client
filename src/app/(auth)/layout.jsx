import Navbar from "@/components/shared/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
