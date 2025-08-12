type MyProps = {
  value: number,
  onChange: (arg: number) => void
}

export default function NumberRating({ value, onChange }: MyProps) {
  return (
    <div className="border border-gray-500 py-2 shadow-sm w-11/12 mx-auto rounded-lg
      lg:w-2/3
    ">
      <p className="text-lg mb-3">How likely are you to recommend Lancrly to others?</p>
      <div className="flex-wrap" style={{ display: "flex", gap: "8px", justifyContent: "center"}}>
        {[...Array(10)].map((_, i) => {
          const num = i + 1;
          return (
            <div
              key={num}
              onClick={() => onChange(num)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: value === num ? "#d226ee" : "#eee",
                color: value === num ? "#fff" : "#333",
                fontWeight: "bold",
                transition: "all 0.2s ease",
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
