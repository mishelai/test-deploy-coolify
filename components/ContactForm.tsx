"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Capture UTM parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};

    if (params.get("utm_source")) utm.utm_source = params.get("utm_source") || undefined;
    if (params.get("utm_medium")) utm.utm_medium = params.get("utm_medium") || undefined;
    if (params.get("utm_campaign")) utm.utm_campaign = params.get("utm_campaign") || undefined;
    if (params.get("utm_term")) utm.utm_term = params.get("utm_term") || undefined;
    if (params.get("utm_content")) utm.utm_content = params.get("utm_content") || undefined;

    setUtmParams(utm);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Combine form data with UTM parameters
      const payload = {
        ...formData,
        ...utmParams,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
      };

      // Send to webhook (replace with your n8n webhook URL)
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";

      if (!webhookUrl) {
        throw new Error("Webhook URL not configured");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>

          {/* Display UTM parameters if present */}
          {Object.keys(utmParams).length > 0 && (
            <div className="text-xs text-muted-foreground">
              Tracking: {Object.keys(utmParams).join(", ")}
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <CheckCircle2 className="h-4 w-4" />
              Thank you! We'll be in touch soon.
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
