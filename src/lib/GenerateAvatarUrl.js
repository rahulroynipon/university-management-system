export default async function GenerateAvatarUrl(fullname) {
  if (!fullname || typeof fullname !== "string") return "";

  const encoder = new TextEncoder();
  const data = encoder.encode(fullname.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const backgroundColor = `#${hashHex.slice(0, 6)}`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullname
  )}&background=${backgroundColor.slice(1)}&color=fff&length=2`;
}
