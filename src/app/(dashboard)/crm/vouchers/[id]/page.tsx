import VoucherDetailsPageContent from "@/components/crm/VoucherDetailsPageContent";

export default async function VoucherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <VoucherDetailsPageContent packageId={id} />;
}
