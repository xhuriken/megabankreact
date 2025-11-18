export default function UserInfo({ user }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Bonjour, {user.name}
      </h2>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
}
