'use client'
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import RipplesScript from '@/components/Ripple';
import Intro from '@/components/Intro/Intro';
export default function HomePage() {
    return (
        <>
            {/* <Intro/> */}
            <main className="min-h-screen">
                <RipplesScript />
                <section
                    className="water hero-with-overlay relative min-h-screen flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: `url(/img/pdma.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30" />

                    <div className="flex items-center justify-center h-screen">


                        <div className="container absolute z-20 mx-auto px-0 pt-28 sm:px-6 lg:px-8 text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="w-[100px] h-[100px] lg:w-44 lg:h-44 rounded-full border-4 border-gray-700 dark:border-white border-primary/30 overflow-hidden shadow-2xl">
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                        
                                        <Image src="/img/fuad.png"
                                            alt='profile pic'
                                            width={200}
                                            height={200}
                                            style={{"objectFit":"cover"}}>
                                        </Image>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white">
                                Hello, I&apos;m Suhail Mujtabir
                            </h1>

                            <div className="text-sm sm:text-sm md:text-xl sm:h-20 md:h-20 h-10 flex items-center justify-center">
                                <span className="text-white sm:font-light lg:font-medium md:font-light">And I am </span>
                                <TypeAnimation
                                    sequence={[
                                        'Textile Engineer',
                                        2000,
                                        'Sustainable Developer',
                                        2000,
                                        'Learner',
                                        2000,
                                        'AI & Tech Enthusiast',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    className="ml-2 font-semibold text-emerald-500 dark:text-red-600"
                                    repeat={Infinity}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="transition hover:scale-110 bg-primary dark:hover:text-primary hover:bg-primary/10 text-primary-foreground font-medium rounded-2xl"
                                >
                                    <Link href="/portfolio">
                                        View My Work
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="transition hover:scale-110 rounded-2xl dark:bg-primary-foreground/20 dark:text-white text-gray-600 hover:text-gray-100 dark:hover:bg-primary/60 dark:hover:text-primary-foreground hover:bg-primary-foreground/10"
                                >
                                    <Link href="/contact">
                                        Get In Touch
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
