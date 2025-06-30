import React from 'react';
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Button, PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { TaglinePickupBlockAttributes as Props } from './props';

// asset
import coverMask from './cover-mask.svg?raw';
import coverTop from './cover-top.svg?raw';

const Edit: React.FC<BlockEditProps<Props>> = ({ attributes, setAttributes }) => {
  const { tagline, posts, backgroundImages = [], enableCarousel = false } = attributes;
  const className = 'tagline-pickup-block';

  // 投稿を取得（最新3件 or 選択したID）
  const selectedPosts = useSelect((select) => {
    if (posts && posts.length > 0) {
      // @ts-ignore
      return select('core').getEntityRecords('postType', 'post', { include: posts }) || [];
    }
    // @ts-ignore
    return select('core').getEntityRecords('postType', 'post', { per_page: 3 }) || [];
  }, [posts]);

  // 画像を追加
  const onSelectImages = (images: any[]) => {
    const imageData = images.map(image => ({
      id: image.id,
      url: image.url || image.sizes?.full?.url,
      alt: image.alt || '',
      caption: image.caption || ''
    }));
    setAttributes({ backgroundImages: imageData });
  };

  // 単一画像を追加
  const onSelectSingleImage = (image: any) => {
    const newImage = {
      id: image.id,
      url: image.url || image.sizes?.full?.url,
      alt: image.alt || '',
      caption: image.caption || ''
    };
    setAttributes({ backgroundImages: [...backgroundImages, newImage] });
  };

  // 画像を削除
  const removeImage = (indexToRemove: number) => {
    const updatedImages = backgroundImages.filter((_, index) => index !== indexToRemove);
    setAttributes({ backgroundImages: updatedImages });
  };

  // 画像の順序を変更
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...backgroundImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setAttributes({ backgroundImages: updatedImages });
  };

  const blockProps = useBlockProps({
    className: className,
  });

  return (
    <div {...blockProps}>
      {/* コンテンツエリア */}
      <div>
        <RichText
          className={ `${className}__tagline` }
          value={tagline}
          onChange={(tagline) => setAttributes({ tagline })}
          placeholder="タグラインを入力してください"
          tagName="h2"
        />

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
          style={{
            backgroundImage: `url(data:image/svg+xml;base64,${btoa(coverTop)})`,
          }}
        />
      </div>

      {/* 画像管理コントロール */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px',
        borderRadius: '4px'
      }}>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectSingleImage}
            allowedTypes={['image']}
            value={backgroundImages.length > 0 ? backgroundImages[backgroundImages.length - 1].id : undefined}
            render={({ open }) => (
              <Button onClick={open} variant="secondary" size="small">
                画像を追加
              </Button>
            )}
          />
        </MediaUploadCheck>
        
        {backgroundImages.length > 1 && (
          <ToggleControl
            label="カルーセル有効"
            checked={enableCarousel}
            onChange={(enableCarousel) => setAttributes({ enableCarousel })}
          />
        )}
      </div>

      {/* 画像一覧とコントロール */}
      {backgroundImages.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          borderRadius: '4px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {backgroundImages.map((image, index) => (
            <div key={index} style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <img 
                src={image.url} 
                alt={image.alt}
                style={{
                  width: '60px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '2px',
                  border: index === 0 ? '2px solid #0073aa' : '1px solid #ddd'
                }}
              />
              <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                {index > 0 && (
                  <Button
                    onClick={() => moveImage(index, index - 1)}
                    variant="tertiary"
                    size="small"
                    style={{ fontSize: '10px', padding: '2px 4px' }}
                  >
                    ←
                  </Button>
                )}
                {index < backgroundImages.length - 1 && (
                  <Button
                    onClick={() => moveImage(index, index + 1)}
                    variant="tertiary"
                    size="small"
                    style={{ fontSize: '10px', padding: '2px 4px' }}
                  >
                    →
                  </Button>
                )}
                <Button
                  onClick={() => removeImage(index)}
                  variant="tertiary"
                  size="small"
                  style={{ fontSize: '10px', padding: '2px 4px', color: 'red' }}
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* カルーセルインジケーター */}
      {enableCarousel && backgroundImages.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          gap: '8px'
        }}>
          {backgroundImages.map((_, index) => (
            <div
              key={index}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: index === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer'
              }}
              onClick={() => {
                // 背景画像を切り替える（エディター用プレビュー）
                const newImages = [...backgroundImages];
                const [selectedImage] = newImages.splice(index, 1);
                newImages.unshift(selectedImage);
                setAttributes({ backgroundImages: newImages });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Edit;