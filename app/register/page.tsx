"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
    username: string;
    email: string;
    password: string;
    catName: string;
    catBreed: string;
    catGender: "male" | "female" | "other";
};

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>({
        username: "",
        email: "",
        password: "",
        catName: "Whiskers",
        catBreed: "Domestic",
        catGender: "female",
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((s) => ({ ...s, [key]: value }));
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        setAvatarFile(f);
        if (f) {
            setAvatarPreview(URL.createObjectURL(f));
        } else {
            setAvatarPreview(null);
        }
    }

    function validate() {
        setError(null);
        if (!form.username.trim()) return "Choose a username.";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Enter a valid email.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        if (!form.catName.trim()) return "Give your cat a name.";
        return null;
    }

    function fileToDataUrl(file: File): Promise<string> {
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(String(fr.result));
            fr.onerror = rej;
            fr.readAsDataURL(file);
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setLoading(true);
        try {
            let avatarData: string | null = null;
            if (avatarFile) avatarData = await fileToDataUrl(avatarFile);

            const payload = {
                ...form,
                avatar: avatarData,
            };

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Registration failed");
            }

            setSuccess("Account created! Redirecting to your cat...");
            setTimeout(() => router.push("/play"), 900);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err) || "An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ maxWidth: 1280, margin: "48px auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
            <h2 style={{ marginBottom: 8 }}>Register to play Oliver Daycare</h2>
            <p style={{ color: "#555", marginTop: 0 }}>Create your account and adopt a virtual cat to care for.</p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 18 }}>
                <label>
                    Username 
                    <input value={form.username} onChange={(e) => update("username", e.target.value)} required />
                </label>

                <label>
                    Email 
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </label>

                <label>
                    Password 
                    <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
                </label>

                <fieldset style={{ border: "1px solid #eee", padding: 12 }}>
                    <legend style={{ fontWeight: 600 }}>Your Cat</legend>

                    <label>
                        Cat Name 
                        <input value={form.catName} onChange={(e) => update("catName", e.target.value)} />
                    </label>

                    <label>
                        Breed 
                        <input value={form.catBreed} onChange={(e) => update("catBreed", e.target.value)} />
                    </label>

                    <label>
                        Gender 
                        <select value={form.catGender} onChange={(e) => update("catGender", e.target.value as FormState["catGender"])}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    <label>
                        Avatar (optional)
                        <input type="file" accept="image/*" onChange={handleFile} />
                    </label>

                    {avatarPreview && (
                        <div style={{ marginTop: 8 }}>
                            <strong>Preview</strong>
                            <div style={{ marginTop: 6 }}>
                                <img src={avatarPreview} alt="avatar preview" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }} />
                            </div>
                        </div>
                    )}
                </fieldset>

                {error && <div style={{ color: "crimson" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
                        {loading ? "Creating..." : "Create Account & Adopt"}
                    </button>
                    <button type="button" onClick={() => router.push("/")} style={{ padding: "8px 12px" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}