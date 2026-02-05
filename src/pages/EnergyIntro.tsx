import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Cpu, BarChart3, Users, Globe } from "lucide-react";
import { ROUTE_PATHS } from "@/lib";

export default function EnergyIntro() {
    const { t } = useTranslation();

    const features = [
        {
            title: t("energy_intro.features.flow_title"),
            description: t("energy_intro.features.flow_desc"),
            icon: <Cpu className="w-10 h-10 text-primary" />,
            link: ROUTE_PATHS.FLOW_REQUEST_FORM,
            color: "bg-blue-500/10 border-blue-500/20",
        },
        {
            title: t("energy_intro.features.dashboard_title"),
            description: t("energy_intro.features.dashboard_desc"),
            icon: <BarChart3 className="w-10 h-10 text-amber-500" />,
            link: ROUTE_PATHS.DASHBOARD,
            color: "bg-amber-500/10 border-amber-500/20",
        },
        {
            title: t("energy_intro.features.compliance_title"),
            description: t("energy_intro.features.compliance_desc"),
            icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
            link: ROUTE_PATHS.COMPLIANCE,
            color: "bg-green-500/10 border-green-500/20",
        },
        {
            title: t("energy_intro.features.sllm_title"),
            description: t("energy_intro.features.sllm_desc"),
            icon: <Zap className="w-10 h-10 text-purple-500" />,
            link: ROUTE_PATHS.SLLM_AUTOMATION,
            color: "bg-purple-500/10 border-purple-500/20",
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="flex flex-col items-start gap-4 text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="inline-block rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-semibold mb-2 text-primary tracking-wide shadow-sm border border-blue-200">
                                {t("energy_intro.hero_badge")}
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900 leading-[1.15]">
                                {t("energy_intro.hero_title_1")}
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                                    {t("energy_intro.hero_title_2")}
                                </span>
                            </h1>
                            <p className="max-w-[600px] text-slate-600 text-lg md:text-xl/relaxed leading-relaxed font-medium">
                                {t("energy_intro.hero_desc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <Link to={ROUTE_PATHS.FLOW_REQUEST_FORM}>
                                    <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-xl shadow-primary/25 rounded-full hover:scale-105 transition-transform">
                                        {t("energy_intro.btn_start")} <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to={ROUTE_PATHS.DEMO}>
                                    <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full border-2 hover:bg-slate-50">
                                        {t("energy_intro.btn_demo")}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/energy_intro_hero.png`}
                                    alt="AI Consultation"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                            </div>
                            {/* Decorative blur elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="py-24 bg-white relative">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-slate-900">
                                {t("energy_intro.solutions_title")}
                            </h2>
                            <p className="max-w-[800px] mx-auto mt-4 text-slate-500 md:text-xl/relaxed">
                                {t("energy_intro.solutions_desc")}
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/energy_intro_solutions.png`}
                                    alt="Integrated Solutions"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                        <div className="order-1 lg:order-2 grid gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link to={feature.link} className="block cursor-pointer group">
                                        <Card className={`transition-all duration-300 hover:shadow-lg border hover:border-primary/50 bg-white group-hover:bg-slate-50`}>
                                            <div className="flex items-center p-4">
                                                <div className={`p-3 rounded-xl mr-4 ${feature.color} bg-opacity-20`}>
                                                    {feature.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg font-bold text-slate-800">{feature.title}</CardTitle>
                                                    <CardDescription className="text-sm mt-1 text-slate-500">
                                                        {feature.description}
                                                    </CardDescription>
                                                </div>
                                                <ArrowRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-primary transition-colors" />
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-slate-50/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white ring-4 ring-white/50"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}assets/energy_intro_philosophy.png`}
                                alt="Expertise Meets Innovation"
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xlmd:text-5xl text-slate-900">
                                {t("energy_intro.philosophy_title")}
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {t("energy_intro.philosophy_desc")}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {(t("energy_intro.philosophy_items", { returnObjects: true }) as unknown as string[]).map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-semibold text-slate-800 text-sm">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-8 pt-4 border-t border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{t("energy_intro.human_experts")}</div>
                                        <div className="text-xs text-slate-500">{t("energy_intro.human_experts_desc")}</div>
                                    </div>
                                </div>
                                <div className="w-px h-auto bg-slate-200" />
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{t("energy_intro.sllm_agent")}</div>
                                        <div className="text-xs text-slate-500">{t("energy_intro.sllm_agent_desc")}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
