import React from 'react';
import { Facebook, Twitter, Linkedin, MessageSquare } from 'react-feather';
import './socialsharebuttons.scss';

interface Props {
    url: string;
    title: string;
}

const SocialShareButtons: React.FC<Props> = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="social-share">
            <span>Partager cet article :</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook">
                <Facebook />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Twitter">
                <Twitter />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn">
                <Linkedin />
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur WhatsApp">
                <MessageSquare />
            </a>
        </div>
    );
};

export default SocialShareButtons;
