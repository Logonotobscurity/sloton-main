"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { analystReports, overallRating } from "@/lib/data/analyst-reports";
import { Download, Star, TrendingUp, BarChart3, PieChart, Activity, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart } from "@/components/ui/radar-chart";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { AnalystReport } from "@/lib/data/analyst-reports";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < fullStars
              ? "fill-yellow-500 text-yellow-500"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-500/50 text-yellow-500"
              : "text-muted-foreground/30"
          )}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

export function AnalystReportsBento() {
  const [selectedReport, setSelectedReport] = useState<AnalystReport | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReportClick = (report: AnalystReport) => {
    setSelectedReport(report);
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to save email and send report
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Check your email for the download link.",
      });

      // Open report in new tab
      if (selectedReport) {
        window.open(selectedReport.downloadUrl, '_blank');
      }

      // Reset and close
      setEmail("");
      setSelectedReport(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-fluid-lg bg-background relative overflow-hidden">
      <div className="container mx-auto px-fluid-sm">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-fluid-xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline">
              Industry Analyst Reports
            </h1>
            <p className="text-fluid-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
              Comprehensive analysis of our market position, innovation leadership, and delivery excellence.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-8">
          
          {/* Overall Rating - Large Card (spans 2 rows on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-6 lg:col-span-4 lg:row-span-2"
          >
            <div className="h-full bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Overall Rating</h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center text-center mb-6">
                <div className="text-6xl font-bold text-primary mb-2">
                  {overallRating.composite.toFixed(1)}
                </div>
                <StarRating rating={overallRating.composite} />
                <p className="text-sm text-muted-foreground mt-2">Composite Score</p>
              </div>

              <div className="space-y-2">
                {overallRating.dimensions.slice(0, 4).map((dim) => (
                  <div key={dim.name} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{dim.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(dim.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{dim.score.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Performance Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4"
          >
            <div className="h-full bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">Performance Matrix</h3>
              </div>
              <RadarChart data={overallRating.dimensions} />
            </div>
          </motion.div>

          {/* Reports Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 lg:col-span-4"
          >
            <div className="h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/50 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-semibold">Total Reports</h3>
              </div>
              <div className="text-5xl font-bold text-blue-500">{analystReports.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Industry analyst evaluations</p>
            </div>
          </motion.div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-3 lg:col-span-4"
          >
            <div className="h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border/50 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-green-500" />
                <h3 className="text-sm font-semibold">Avg Rating</h3>
              </div>
              <div className="text-5xl font-bold text-green-500">
                {(analystReports.reduce((acc, r) => acc + r.rating, 0) / analystReports.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all reports</p>
            </div>
          </motion.div>

          {/* Report Cards - Compact Bento Style */}
          {analystReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="md:col-span-3 lg:col-span-4"
            >
              <div className="h-full bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br text-white font-bold text-sm",
                    report.color
                  )}>
                    {report.number}
                  </div>
                  <StarRating rating={report.rating} />
                </div>

                {/* Compact Title */}
                <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                  {report.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {report.subtitle}
                </p>

                {/* Compact Analyst Badge */}
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted/50 rounded-full mb-3 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-medium truncate">{report.analystFirm}</span>
                </div>

                {/* Compact Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {report.keyMetrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx} className="bg-muted/30 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                      <div className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent line-clamp-1">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Single Highlight */}
                <div className="mb-3 flex-1">
                  <div className="text-xs text-foreground flex items-start gap-2">
                    <TrendingUp className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{report.highlights[0]}</span>
                  </div>
                </div>

                {/* Compact Download Button */}
                <Button
                  onClick={() => handleReportClick(report)}
                  className="w-full h-9 text-sm"
                  variant="default"
                >
                  <Download className="w-3 h-3 mr-2" />
                  View Report
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-border/50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-semibold mb-2">Want to Learn More?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover how our solutions can transform your business. Connect with our team for a personalized consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a 
                href={getWhatsAppUrl({ 
                  message: "I'd like to learn more about your analyst reports and solutions",
                  source: "Analyst Reports Page"
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Download Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Download Report
            </DialogTitle>
            <DialogDescription>
              Enter your email to receive the full analyst report as a PDF.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              {/* Report Preview */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br text-white font-bold text-sm flex-shrink-0",
                    selectedReport.color
                  )}>
                    {selectedReport.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{selectedReport.title}</h4>
                    <p className="text-xs text-muted-foreground">{selectedReport.analystFirm}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < Math.floor(selectedReport.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                      <span className="text-xs ml-1">{selectedReport.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleDownload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you the PDF report and occasional updates about our solutions.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedReport(null)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Privacy Note */}
              <p className="text-xs text-center text-muted-foreground">
                Your email is safe with us. We respect your privacy and won't spam you.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
