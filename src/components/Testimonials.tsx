// import React from 'react';
// import { motion } from 'motion/react';
// import { Quote, MessageSquareQuote } from 'lucide-react';
// import { TESTIMONIALS_DATA } from '../data';

// export default function Testimonials() {
//   return (
//     <section className="py-20 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Section Heading */}
//         <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="inline-block bg-very-light-blue text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
//           >
//             TESTIMONI KLIEN
//           </motion.div>
//           <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
//             Apa Kata Klien Tri Yatmi?
//           </h2>
//           <p className="text-gray-600 sm:text-lg leading-relaxed">
//             Kepercayaan klien adalah aset kami yang paling berharga. Berikut penuturan jujur dari mereka yang telah mempercayakan propertinya bersama Tri Yatmi.
//           </p>
//         </div>

//         {/* Testimonials Grid Card */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {TESTIMONIALS_DATA.map((t, idx) => (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//               key={t.id}
//               className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between hover:bg-slate-100/50 hover:shadow-md transition-all duration-300"
//             >
//               {/* Note for developer regarding cms customization */}
//               {/* DEVELOPER NOTE: Replace with genuine customer photo assets and direct quotes as collected */}
              
//               <div className="space-y-4 relative">
//                 {/* Quote Icon Accent */}
//                 <Quote className="w-8 h-8 text-cyan-blue/20 absolute -top-2 -left-2 rotate-180" />
                
//                 <p className="text-sm sm:text-base text-slate-600 leading-relaxed italic z-10 relative">
//                   {t.content}
//                 </p>
//               </div>

//               {/* Author Info */}
//               <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-slate-200/60 select-none">
//                 <img
//                   src={t.avatar}
//                   alt={t.name}
//                   loading="lazy"
//                   className="w-11 h-11 rounded-full object-cover border border-slate-200"
//                   referrerPolicy="no-referrer"
//                 />
//                 <div>
//                   <h4 className="font-bold text-sm text-navy">
//                     {t.name}
//                   </h4>
//                   <p className="text-xs font-semibold text-[#0077B6] mt-0.5">
//                     {t.role}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-12 text-xs text-slate-400 select-none">
//           * Catatan: Seluruh testimoni di atas merupakan gambaran komitmen orisinal layanan kami yang siap diselaraskan dengan ulasan rill media sosial Anda.
//         </div>

//       </div>
//     </section>
//   );
// }

