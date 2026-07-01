import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const locale = acceptLanguage.toLowerCase().includes("ja")
    ? "ja"
    : i18n.defaultLocale;

  // Redirect to locale-prefixed URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
