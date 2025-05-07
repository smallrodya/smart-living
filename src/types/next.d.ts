export interface PageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface LayoutProps {
  children: React.ReactNode;
  params: { [key: string]: string | string[] | undefined };
}

export interface GenerateMetadataProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

declare module 'next' {
  interface PageProps {
    params: { [key: string]: string | string[] | undefined };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
} 