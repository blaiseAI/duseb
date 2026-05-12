import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80 }}>
        <p className="mono" style={{ padding: 48 }}>Nav smoke test</p>
      </main>
    </>
  );
}
