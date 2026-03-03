import pic from "..//assets/me.png"
export default function RightPanel() {
  return (
    <div className="w-64 bg-teal-200 border-l p-6">
      <h2 className="font-bold text-3xl text-center mb-4 mt-15">Hi Ahmad</h2>

      <div>
        <img src={pic} alt="" />
      </div>

      <div className="space-y-3 text-lg font-semibold text-gray-600">
        <p>Stay productive.</p>
        <p>Keep learning React.</p>
        <p>Build awesome stuff.</p>
      </div>
    </div>
  );
}