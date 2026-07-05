import { getTranslations } from "next-intl/server";
import { usersRepo } from "@meserete/backend";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AdminMembersPage() {
  const t = await getTranslations("admin.members");
  const users = await usersRepo.listAdminUsers();

  const roleLabels: Record<string, string> = {
    ADMIN: t("roleAdmin"),
    TEACHER: t("roleTeacher"),
  };

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("listTitle")}
      </h1>

      {users.length === 0 ? (
        <p className="font-cardo" style={{ color: "var(--color-ink-soft)" }}>
          {t("empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border-[1.5px]" style={{ borderColor: "var(--color-accent-gold)" }}>
          <table className="w-full border-collapse font-cardo text-sm">
            <thead>
              <tr style={{ background: "var(--color-primary-800)" }}>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("name")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("email")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("role")}</th>
                <th className="px-4 py-3 text-left font-ethiopic text-parchment">{t("createdAt")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  style={{
                    background: i % 2 === 0 ? "rgba(244,239,250,.5)" : "rgba(230,219,241,.3)",
                  }}
                >
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {user.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {user.email}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {roleLabels[user.role] ?? user.role}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--color-ink)" }}>
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
