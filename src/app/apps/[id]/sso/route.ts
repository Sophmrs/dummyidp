import { NextRequest, NextResponse } from "next/server";
import saml from '@boxyhq/saml20';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const url = req.nextUrl.clone();
  url.pathname = `/apps/${params.id}/login`;
  url.search = new URLSearchParams((await req.formData()) as any).toString();
  return NextResponse.redirect(url, 302);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const samlRequest = req.nextUrl.searchParams.get('SAMLRequest') || '';

  const url = req.nextUrl.clone();

  const rawRequest = await saml.decodeBase64(samlRequest, true);

  url.protocol = 'http:';

  url.pathname = `/apps/${params.id}/login`;
  url.searchParams.set('SAMLRequest', btoa(rawRequest));

  return NextResponse.redirect(url, 302);
}
