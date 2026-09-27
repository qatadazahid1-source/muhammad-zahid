import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace text colors
    content = content.replace(/text-slate-[12]00/g, 'text-primary');
    content = content.replace(/text-slate-[34]00/g, 'text-secondary');
    content = content.replace(/text-slate-[56]00/g, 'text-muted');
    content = content.replace(/text-gray-[45]00/g, 'text-muted');
    content = content.replace(/text-gray-[12]00/g, 'text-primary');
    content = content.replace(/text-white/g, 'text-primary');

    // Replace backgrounds
    content = content.replace(/bg-slate-900/g, 'bg-background');
    content = content.replace(/bg-\[\#0f1115\]/g, 'bg-background');
    content = content.replace(/bg-\[\#0b0d12\]/g, 'bg-background');
    
    content = content.replace(/bg-\[\#141820\]/g, 'bg-surface');
    content = content.replace(/bg-\[\#151922\]/g, 'bg-surface');
    content = content.replace(/bg-\[\#12151c\]/g, 'bg-surface');
    content = content.replace(/bg-slate-800/g, 'bg-surface');

    content = content.replace(/bg-\[\#181d28\]/g, 'bg-surface-elevated');
    content = content.replace(/bg-slate-700/g, 'bg-surface-elevated');

    // Replace borders
    content = content.replace(/border-slate-800/g, 'border-border');
    content = content.replace(/border-slate-700/g, 'border-border');
    
    // Form Inputs explicitly need text color
    content = content.replace(/<input([^>]*?)className="/g, '<input$1className="text-primary ');
    content = content.replace(/<textarea([^>]*?)className="/g, '<textarea$1className="text-primary ');
    content = content.replace(/<select([^>]*?)className="/g, '<select$1className="text-primary ');

    fs.writeFileSync(file, content);
});

console.log('Styles updated.');
