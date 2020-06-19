export function domainAuthorization(allowedDomains) {
  const allowedDomainsSet = new Set(allowedDomains);

  return ({ email }) => {
    /* if (allowedDomainsSet.size === 0) {
      return true;
    }

    if (email === undefined) {
      return false
    }

    const [_, domain] = email.split("@"); */

    return true // allowedDomainsSet.has(domain);
  };
}
