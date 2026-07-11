function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function pathMatches(pathname: string, menuPath: string): boolean {
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
}

function findLongestMatchingMenuPath(
  pathname: string,
  menuPaths: string[],
): string | null {
  let longestMatch: string | null = null;

  for (const menuPath of menuPaths) {
    if (!pathMatches(pathname, menuPath)) {
      continue;
    }

    if (!longestMatch || menuPath.length > longestMatch.length) {
      longestMatch = menuPath;
    }
  }

  return longestMatch;
}

export function canAccessMenuPath(
  pathname: string,
  allowedPaths: string[],
  allMenuPaths: string[],
): boolean {
  const normalizedPathname = normalizePath(pathname);
  const normalizedAllowedPaths = new Set(
    allowedPaths.map((path) => normalizePath(path)),
  );
  const normalizedAllMenuPaths = allMenuPaths.map((path) => normalizePath(path));

  const matchedPath = findLongestMatchingMenuPath(
    normalizedPathname,
    normalizedAllMenuPaths,
  );

  if (!matchedPath) {
    return true;
  }

  return normalizedAllowedPaths.has(matchedPath);
}
