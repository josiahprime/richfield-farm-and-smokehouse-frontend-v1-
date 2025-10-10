// src/components/SaleBanner.jsx (or wherever you store your components)
const SaleBanner = () => {
    return (
      <section className="py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center px-10">
        <p className="text-sm p-2">
          Summer Sale: Save up to 40% on select items.{" "}
          <span className="text-red-500">Limited-time offer!</span>
        </p>
      </section>
    );
  };
  
  export default SaleBanner;
  