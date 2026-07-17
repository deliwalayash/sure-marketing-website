import { CtaBand, Testimonials } from "@/components/Sections";

export const metadata = {
  title: "Testimonials",
  description: "Client feedback for Sure Marketing digital marketing services."
};

export default function TestimonialsPage() {
  return (
    <>
      <Testimonials />
      <CtaBand />
    </>
  );
}
