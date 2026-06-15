/**
 * Username utility functions for TapeTennis platform
 */

/**
 * Generates a username from an email address
 * @param email - The email address to generate username from
 * @param existingUsernames - Array of existing usernames to avoid duplicates
 * @returns A unique username string
 */
export function emailToUsername(email: string, existingUsernames: string[] = []): string {
  // Extract the part before @ symbol
  const emailPrefix = email.split('@')[0];
  
  // Clean the prefix: remove special characters except dots and underscores
  let baseUsername = emailPrefix
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '') // Remove special chars except . and _
    .replace(/^[._]/, '') // Remove leading dots/underscores
    .replace(/[._]$/, '') // Remove trailing dots/underscores
    .replace(/[._]{2,}/g, '_'); // Replace multiple consecutive dots/underscores with single underscore

  // Ensure minimum length of 3 characters
  if (baseUsername.length < 3) {
    baseUsername = baseUsername.padEnd(3, '0');
  }

  // Ensure maximum length of 30 characters
  if (baseUsername.length > 30) {
    baseUsername = baseUsername.substring(0, 30);
  }

  // Check if username already exists
  let finalUsername = baseUsername;
  let counter = 1;

  while (existingUsernames.includes(finalUsername)) {
    // If username exists, append a number
    const suffix = counter.toString();
    const maxBaseLength = 30 - suffix.length;
    finalUsername = baseUsername.substring(0, maxBaseLength) + suffix;
    counter++;
  }

  return finalUsername;
}

/**
 * Generates a random username when email-based generation fails
 * @param existingUsernames - Array of existing usernames to avoid duplicates
 * @returns A unique random username string
 */
export function generateRandomUsername(existingUsernames: string[] = []): string {
  const adjectives = [
    'swift', 'bold', 'clever', 'mighty', 'fierce', 'brave', 'quick', 'smart',
    'strong', 'bright', 'sharp', 'fast', 'cool', 'ace', 'pro', 'elite'
  ];
  
  const nouns = [
    'player', 'warrior', 'champion', 'master', 'hero', 'legend', 'star', 'genius',
    'tiger', 'falcon', 'eagle', 'panther', 'storm', 'thunder', 'blade', 'arrow'
  ];

  let finalUsername: string;
  let counter = 1;

  do {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 999) + 1;
    
    finalUsername = `${adjective}_${noun}_${randomNum}`;
    
    // If still exists, add counter
    if (existingUsernames.includes(finalUsername)) {
      finalUsername = `${adjective}_${noun}_${randomNum}_${counter}`;
      counter++;
    }
  } while (existingUsernames.includes(finalUsername) && counter < 100);

  return finalUsername;
}

/**
 * Validates username format
 * @param username - Username to validate
 * @returns boolean indicating if username is valid
 */
export function validateUsername(username: string): boolean {
  // Username rules: 3-30 characters, alphanumeric, underscore, dots allowed
  // Must start with alphanumeric character
  const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._]{2,29}$/;
  return usernameRegex.test(username);
}

/**
 * Sanitizes a string to be username-friendly
 * @param input - Input string to sanitize
 * @returns Sanitized username string
 */
export function sanitizeUsername(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '') // Remove special chars except . and _
    .replace(/^[._]/, '') // Remove leading dots/underscores
    .replace(/[._]$/, '') // Remove trailing dots/underscores
    .replace(/[._]{2,}/g, '_') // Replace multiple consecutive dots/underscores with single underscore
    .substring(0, 30); // Limit to 30 characters
}