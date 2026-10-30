export default function ScoreInput({ label, hint, value, onChange }) {
  return (
    <label className="field">
      <span>
        {label} {hint && <span className="hint">{hint}</span>}
      </span>
      <div className="score-input">
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <output>{value}</output>
      </div>
    </label>
  )
}
