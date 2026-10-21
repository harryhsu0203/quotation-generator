import ProductSubnav from "@/components/site/ProductSubnav";

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductSubnav />
      {children}
    </>
  );
}
