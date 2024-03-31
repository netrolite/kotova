import Logo from "@/components/Logo";

export default function MainLayoutHeaderMiddleSection() {
  return (
    <div className="flex items-center justify-center">
      <Logo className="max-h-[30px] max-w-[98px]" linkClassName="md:hidden" />
    </div>
  );
}
