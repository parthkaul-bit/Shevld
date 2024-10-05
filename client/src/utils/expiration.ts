// expiration.ts (new file)
export const getExpirationStatus = (expirationDate: string) => {
    const expiration = new Date(expirationDate);
    const now = new Date();
    const timeDiff = expiration.getTime() - now.getTime();
    const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    if (daysUntilExpiration < 0) {
      return { status: "Expired", color: "bg-red-500" };
    } else if (daysUntilExpiration <= 3) {
      return { status: "Expiring Soon", color: "bg-yellow-500" };
    } else {
      return { status: `Expires in ${daysUntilExpiration} days`, color: "bg-green-500" };
    }
  };
  