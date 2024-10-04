export default function Inputbox({ label, placeholder, value, onChange, width,type,name}) {
    return (
      <div className="mx-1">
      <div className="text-sm font-medium text-left py-2">
        <label className="mb-2">{label}</label></div>
        <input
          required
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-${width} px-2 py-1 border rounded border-slate-400 bg-zinc-300 border-solid border-1 border-neutral-500`}
        />
      </div>
    );
  }
  