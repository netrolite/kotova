import Logo from "../Logo";

type Props = {};

export default function AuthLayoutHeader({}: Props) {
  return (
    <div className="m-auto mb-6 max-w-[120px]">
      <Logo />
    </div>
  );
}
