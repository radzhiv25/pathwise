export type AiProvider = "anthropic" | "openai" | "openrouter" | "mistral" | "gemini";

const PROVIDER_STORAGE_KEY = "pathwise_ai_provider";
const KEY_STORAGE_PREFIX = "pathwise_ai_key_";

/** Backward-compatible legacy key path used before multi-provider BYOK. */
export const PATHWISE_ANTHROPIC_LOCAL_KEY = "pathwise_anthropic_api_key" as const;

export function getStoredProvider(): AiProvider {
  if (typeof window === "undefined") return "anthropic";
  const provider = localStorage.getItem(PROVIDER_STORAGE_KEY);
  if (
    provider === "anthropic" ||
    provider === "openai" ||
    provider === "openrouter" ||
    provider === "mistral" ||
    provider === "gemini"
  ) {
    return provider;
  }
  return "anthropic";
}

export function setStoredProvider(provider: AiProvider) {
  localStorage.setItem(PROVIDER_STORAGE_KEY, provider);
}

function getProviderKeyStorageKey(provider: AiProvider) {
  return `${KEY_STORAGE_PREFIX}${provider}`;
}

export function getStoredProviderKey(provider: AiProvider): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = localStorage.getItem(getProviderKeyStorageKey(provider));
  const trimmed = value?.trim();
  if (trimmed) return trimmed;

  // Migrate legacy anthropic key seamlessly.
  if (provider === "anthropic") {
    const legacy = localStorage.getItem(PATHWISE_ANTHROPIC_LOCAL_KEY)?.trim();
    if (legacy) {
      localStorage.setItem(getProviderKeyStorageKey("anthropic"), legacy);
      return legacy;
    }
  }
  return undefined;
}

export function setStoredProviderKey(provider: AiProvider, key: string) {
  localStorage.setItem(getProviderKeyStorageKey(provider), key.trim());
}

export function clearStoredProviderKey(provider: AiProvider) {
  localStorage.removeItem(getProviderKeyStorageKey(provider));
  if (provider === "anthropic") {
    localStorage.removeItem(PATHWISE_ANTHROPIC_LOCAL_KEY);
  }
}
