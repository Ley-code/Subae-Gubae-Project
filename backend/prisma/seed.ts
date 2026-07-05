import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@meseretehaimanot.org";
  const adminPassword = "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  const admin =
    existingAdmin ??
    (await prisma.user.create({
      data: {
        email: adminEmail,
        name: "አስተዳዳሪ",
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "ADMIN",
      },
    }));

  await prisma.news.upsert({
    where: { slug: "የሰንበት-ትምህርት-ቤት-ምዝገባ-ተጀምሯል" },
    update: {},
    create: {
      slug: "የሰንበት-ትምህርት-ቤት-ምዝገባ-ተጀምሯል",
      title: "የሰንበት ትምህርት ቤት ምዝገባ ተጀምሯል",
      body: "ለአዲሱ ዓመት የሰንበት ትምህርት ቤት ምዝገባ ተጀምሯል። ወላጆች እና ተማሪዎች በድረ ገጻችን በኩል በቀላሉ መመዝገብ ይችላሉ። ለተጨማሪ መረጃ የምዝገባ ገጹን ይጎብኙ።",
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.news.upsert({
    where: { slug: "የመዝሙር-ልምምድ-መርሐ-ግብር" },
    update: {},
    create: {
      slug: "የመዝሙር-ልምምድ-መርሐ-ግብር",
      title: "የመዝሙር ልምምድ መርሐ ግብር ተሻሽሏል",
      body: "የመዘምራን ቡድናችን በየሳምንቱ እሁድ ከቅዳሴ በኋላ ልምምድ ያደርጋል። አዲስ ድምጻውያን በደስታ ይቀበላሉ።",
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  const now = new Date();
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  nextSunday.setHours(6, 0, 0, 0);

  await prisma.event.upsert({
    where: { slug: "ሳምንታዊ-ቅዳሴ" },
    update: {},
    create: {
      slug: "ሳምንታዊ-ቅዳሴ",
      title: "ሳምንታዊ ቅዳሴ እና ትምህርት",
      description:
        "በየሳምንቱ እሁድ ጠዋት ከጸሎት እና ቅዳሴ ጀምሮ እስከ ትምህርት እና መዝሙር የሚደርስ የሰንበት ትምህርት ቤት መርሐ ግብር።",
      location: "ታዕካ ነገሥት በአታ ለማርያም ገዳም",
      startsAt: nextSunday,
      published: true,
      authorId: admin.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "የቅድስት-ማርያም-በዓል" },
    update: {},
    create: {
      slug: "የቅድስት-ማርያም-በዓል",
      title: "እመቤታችን ቅድስት ድንግል ማርያም",
      body: "እመቤታችን ቅድስት ድንግል ማርያም የክርስቲያኖች ሁሉ እናት እና አማላጅ ናት። ገዳማችን በስሟ የተሰየመው ለእርሷ ካለን ክብር እና ፍቅር የተነሳ ነው።",
      category: "የቅዱሳን ታሪክ",
      published: true,
      authorId: admin.id,
    },
  });

  await prisma.hymn.upsert({
    where: { slug: "ውዳሴ-ማርያም" },
    update: {},
    create: {
      slug: "ውዳሴ-ማርያም",
      title: "ውዳሴ ማርያም",
      lyrics: "ውዳሴ ማርያም ዘሰርክ... (ሙሉ ግጥም በቅርቡ ይታከላል)",
      category: "ማህሌት",
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
