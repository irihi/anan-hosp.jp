import React from 'react';
import { type BlockSaveProps } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { TaglinePickupBlockAttributes as Props } from './props';

// asset
import coverMask from './cover-mask.svg?raw';
import coverTop from './cover-top.svg?raw';

const Save: React.FC<BlockSaveProps<Props>> = ({ attributes }) => {
  const { tagline, posts, backgroundImages = [], enableCarousel = false } = attributes;
  const className = 'tagline-pickup-block';

  // 投稿を取得（最新3件 or 選択したID）
  /* const selectedPosts = useSelect((select) => {
    if (posts && posts.length > 0) {
      // @ts-ignore
      return select('core').getEntityRecords('postType', 'post', { include: posts }) || [];
    }
    // @ts-ignore
    return select('core').getEntityRecords('postType', 'post', { per_page: 3 }) || [];
  }, [posts]); */

  const blockProps = useBlockProps.save({
    className: className,
  });

  return (
    <div {...blockProps}>
      {/* コンテンツエリア */}
      <div>
        <RichText.Content
          className={ `${className}__tagline` }
          value={tagline}
          tagName="h2"
        />

        { /* 公開時保留
        <div className={ `${className}__pickup-articles` }>
          <h4>Pick up</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {selectedPosts && selectedPosts.map((post: any) => (
              <li key={post.id} style={{ marginBottom: '0.5rem' }}>
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {post.title.rendered}
                </a>
              </li>
            ))}
          </ul>
        </div>
        */ }
        <div className={ `${className}__carousel` }>
          { backgroundImages.map((image, index) => (
            <div
              className={ `${className}__carousel--item`}
              key={ index }
              style={{
                backgroundImage: `url(${image.url})`,
                mask: `url(data:image/svg+xml;base64,${btoa(coverMask)}) right clamp(1.25rem, 0.158rem + 4.66vw, 5.75rem) bottom / auto 150% no-repeat`,
              }}
            />
          )) }
        </div>
        <div
          className={ `${className}__top` }
        />
      </div>
    </div>
  );
};

export default Save;