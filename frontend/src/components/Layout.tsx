import useRecording from "@/hooks/useRecording";

export default function Layout({ children }: { children: React.ReactNode }) {
    useRecording();

    return children;
}