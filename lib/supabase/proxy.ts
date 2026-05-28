import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const path = request.nextUrl.pathname;

  function redirect(pathname: string) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.redirect(url);
  }

// 1. unauthenticated
if (!user) {
  if (path.startsWith('/dashboard') || path.startsWith('/onboarding')) {
    return redirect('/login')
  }
  return supabaseResponse
}

// 2. authenticated — bounce off marketing + login
if (path === '/' || path === '/login') {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.sub)
    .single()
  return profile ? redirect('/dashboard') : redirect('/onboarding')
}

// 3. authenticated — enforce onboarding
if (path.startsWith('/dashboard') || path.startsWith('/onboarding')) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.sub)
    .single()

  if (!profile && !path.startsWith('/onboarding')) return redirect('/onboarding')
  if (profile && path.startsWith('/onboarding')) return redirect('/dashboard')
}

return supabaseResponse;
}
