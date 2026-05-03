import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditModelForm from "@/components/EditModelForm";

export const dynamic = "force-dynamic";

export default async function EditModelPage({ params }) {
  const { id } = await params;
  const model = await prisma.camperModel.findUnique({ where: { id } });
  if (!model) notFound();

  return (
    <div>
      <EditModelForm model={model} />
    </div>
  );
}
